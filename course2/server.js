// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer  = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up EJS templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global in‑memory storage for lessons and progress.
let lessons = [];
let progressData = {};

// -----------
// Helper Functions
// -----------

// Load and parse qa.txt. Expected format:
//   Lesson Title (a line without a tab)
//   Question<TAB>Answer<TAB>Help
function loadLessons() {
  const qaFilePath = path.join(__dirname, 'qa.txt');
  const fileContent = fs.readFileSync(qaFilePath, 'utf-8');
  const lines = fileContent.split(/\r?\n/).filter(line => line.trim() !== '');
  
  lessons = []; // Clear out any existing lessons
  let currentLesson = null;

  for (const line of lines) {
    // 1) Detect a new lesson line by checking for "@id:"
    const lessonMatch = line.match(/^@id:([^\s]+)\s+(.+)/);
    if (lessonMatch) {
      // We have something like "@id:animals Lesson About Animals"
      // lessonMatch[1] => "animals" (the stable ID)
      // lessonMatch[2] => "Lesson About Animals" (the title)

      const stableId = lessonMatch[1].trim();
      const title = lessonMatch[2].trim();

      currentLesson = {
        id: stableId,           // use the stable ID
        title: title,
        questions: []
      };
      lessons.push(currentLesson);
    } else {
      // 2) Otherwise, this should be a question line or something else
      if (!currentLesson) {
        // If we find a question line before any lesson line, ignore or skip
        continue;
      }
      const parts = line.split('\t');
      const questionText = parts[0].trim();
      const answerText = parts[1] ? parts[1].trim() : '';
      const helpText = parts[2] ? parts[2].trim() : '';
      let audio = null;
      if (parts.length >= 4) {
        const potentialAudio = parts[3].trim();
        if (potentialAudio.endsWith('.mp3') || potentialAudio.endsWith('.wav')) {
          audio = potentialAudio;
        }
      }

      const questionObj = {
        id: currentLesson.questions.length + 1,
        question: questionText,
        answer: answerText,
        help: helpText,
        audio: audio
      };
      currentLesson.questions.push(questionObj);
    }
  }
}

// Load progressData from progress.json (or create defaults if missing)
function loadProgress() {
  const progressPath = path.join(__dirname, 'progress.json');
  if (fs.existsSync(progressPath)) {
    try {
      progressData = JSON.parse(fs.readFileSync(progressPath, 'utf-8'));
    } catch (err) {
      console.error('Error parsing progress.json:', err);
      progressData = {};
    }
  } else {
    progressData = {};
  }

  // Ensure every lesson has an entry.
  lessons.forEach(lesson => {
    if (!progressData[lesson.id]) {
      // Create a default progress entry with a queue of question IDs
      progressData[lesson.id] = {
        queue: lesson.questions.map(q => q.id),
        // Store per‑question progress info.
        questions: {},
        masteryThreshold: 3 // Default threshold; can be updated by the learner.
      };
      lesson.questions.forEach(q => {
        progressData[lesson.id].questions[q.id] = {
          consecutiveCorrect: 0,
          totalCorrect: 0
        };
      });
    } else {
      // Ensure each question has a progress record.
      lesson.questions.forEach(q => {
        if (!progressData[lesson.id].questions[q.id]) {
          progressData[lesson.id].questions[q.id] = {
            consecutiveCorrect: 0,
            totalCorrect: 0
          };
          if (!progressData[lesson.id].queue.includes(q.id)) {
            progressData[lesson.id].queue.push(q.id);
          }
        }
      });
      // If for some reason masteryThreshold is not set, default it.
      if (!progressData[lesson.id].masteryThreshold) {
        progressData[lesson.id].masteryThreshold = 3;
      }
    }
  });

  saveProgress();
}

// Save the current progressData object back to progress.json.
function saveProgress() {
  const progressPath = path.join(__dirname, 'progress.json');
  fs.writeFileSync(progressPath, JSON.stringify(progressData, null, 2));
}

function syncQueue(lessonId) {
  const prog = progressData[lessonId];
  const masteryThreshold = prog.masteryThreshold;
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return;

  // Start with the current queue (order preserved from previous answer submissions)
  let newQueue = [...prog.queue];

  // Find the questions that are not currently in the queue but have not yet reached mastery.
  let missingQuestions = lesson.questions.filter(
    q => !newQueue.includes(q.id) && prog.questions[q.id].consecutiveCorrect < masteryThreshold
  );

  // For each missing question, compute the desired insertion index.
  // Use the formula: desiredIndex = 5 + 5*(consecutiveCorrect - 1) if consecutiveCorrect > 0,
  // and default to 0 if the question has never been answered.
  missingQuestions = missingQuestions.map(q => {
    const cc = prog.questions[q.id].consecutiveCorrect;
    const desiredIndex = cc > 0 ? (5 + 5 * (cc - 1)) : 0;
    return { qid: q.id, desiredIndex };
  });

  // Sort missing questions by desiredIndex ascending. If two questions have the same desiredIndex,
  // keep their original order (for example, by comparing their question id).
  missingQuestions.sort((a, b) => {
    if (a.desiredIndex !== b.desiredIndex) return a.desiredIndex - b.desiredIndex;
    return a.qid - b.qid;
  });

  // Insert each missing question into newQueue at its computed position.
  // Note that as we insert items, the array length changes, so we always clamp the insertion index
  // to the current length of newQueue.
  missingQuestions.forEach(item => {
    const insertAt = Math.min(item.desiredIndex, newQueue.length);
    newQueue.splice(insertAt, 0, item.qid);
  });

  prog.queue = newQueue;
  saveProgress();
}


// Add a media reward if a question is answered correctly five consecutive times.
function addMediaReward(lessonId) {
  const mediaDir = path.join(__dirname, 'public', 'media');
  // Supported media formats.
  const supportedFormats = ['.jpg', '.png', '.gif', '.mp4', '.m4v'];
  let mediaFiles = [];

  // (A) Local media files from public/media (excluding moremedia.txt)
  try {
    const localFiles = fs.readdirSync(mediaDir).filter(file => {
      return file !== 'moremedia.txt' && supportedFormats.includes(path.extname(file).toLowerCase());
    });
    localFiles.forEach(file => {
      mediaFiles.push({
        url: '/media/' + file, // Served by static middleware.
        name: file,
        external: false
      });
    });
  } catch (err) {
    console.error('Error reading media directory:', err);
  }

  // (B) Check if moremedia.txt exists and, if so, read external directories.
  const moreMediaPath = path.join(mediaDir, 'moremedia.txt');
  if (fs.existsSync(moreMediaPath)) {
    try {
      const moreMediaContent = fs.readFileSync(moreMediaPath, 'utf-8');
      // Each nonempty line is treated as a directory path.
      const directories = moreMediaContent
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line !== '');
      directories.forEach(dir => {
        if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory()) {
          try {
            const externalFiles = fs.readdirSync(dir).filter(file =>
              supportedFormats.includes(path.extname(file).toLowerCase())
            );
            externalFiles.forEach(file => {
              const fullPath = path.join(dir, file);
              // Encode the full path so that we can safely pass it as a query parameter.
              const encodedPath = Buffer.from(fullPath).toString('base64');
              mediaFiles.push({
                url: '/reward?file=' + encodeURIComponent(encodedPath),
                name: file,
                external: true
              });
            });
          } catch (err) {
            console.error('Error reading external directory:', dir, err);
          }
        }
      });
    } catch (err) {
      console.error('Error reading moremedia.txt:', err);
    }
  }

  // If no media files were found, return null.
  if (mediaFiles.length === 0) return null;

  // Randomly select one media file.
  const randomIndex = Math.floor(Math.random() * mediaFiles.length);
  const chosenMedia = mediaFiles[randomIndex];

  // Optionally, add the reward to the lesson’s progressData rewards array here.
  // For example:
  if (!progressData[lessonId].rewards) {
    progressData[lessonId].rewards = [];
  }
  progressData[lessonId].rewards.push(chosenMedia);
  saveProgress();

  return chosenMedia;
}

// -----------
// Initial Load
// -----------
loadLessons();
loadProgress();

// -----------
// Routes
// -----------

// Home page: list lessons.
app.get('/', (req, res) => {
  // Compute a simple progress metric: percent of questions “done”
  const lessonsWithProgress = lessons.map(lesson => {
    const prog = progressData[lesson.id];
    const total = lesson.questions.length;
    const remaining = prog.queue.length;
    const done = total - remaining;
    const progressPercent = total ? Math.round((done / total) * 100) : 0;
    return { ...lesson, progressPercent, remaining };
  });
  res.render('index', { lessons: lessonsWithProgress });
});
function renderEmbeddedMedia(text) {
  // Replace all occurrences of [filepath] with the corresponding media tag.
  return text.replace(/\[([^\]]+)\]/g, (match, filePath) => {
    // Trim and determine the file extension.
    filePath = filePath.trim();
    const ext = filePath.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      return `<img src="${filePath}" alt="Embedded Image" style="max-width:100%;"/>`;
    } else if (['mp4', 'webm'].includes(ext)) {
      return `<video src="${filePath}" controls style="max-width:100%;"></video>`;
    } else if (['mp3', 'wav'].includes(ext)) {
      return `<audio src="${filePath}" controls style="max-width:100%;"></audio>`;
    }
    // If the extension is not recognized, return the original text.
    return match;
  });
}
// Lesson page: show the current question for practice.
// A default mastery threshold (i.e. number of consecutive correct answers to “master” the question)
// is set here (feel free to adjust or even let the user choose).
app.get('/lesson/:lessonId', (req, res) => {
  const lessonId = req.params.lessonId;  // Do not parseInt
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return res.status(404).send('Lesson not found');
  
  const prog = progressData[lessonId];

  // If masteryThreshold is provided in the query, update and save it.
  const queryThreshold = parseInt(req.query.masteryThreshold);
  if (!isNaN(queryThreshold) && queryThreshold > 0) {
    prog.masteryThreshold = queryThreshold;
    saveProgress();
  }

  // Sync the queue if needed (if you have that function)
  syncQueue(lessonId);

  let currentQuestion = null;
  if (prog.queue.length > 0) {
    const currentQuestionId = prog.queue[0];
    currentQuestion = lesson.questions.find(q => q.id === currentQuestionId);
  }
  res.render('lesson', {
    lesson,
    question: currentQuestion,
    progress: currentQuestion ? prog.questions[currentQuestion.id] : null,
    masteryThreshold: prog.masteryThreshold,
    renderEmbeddedMedia
  });
});

// POST route to handle answer submission and update the question queue.
// Expected JSON body: { result: "correct" | "incorrect", masteryThreshold: number }
app.post('/lesson/:lessonId/answer', (req, res) => {
  const lessonId = req.params.lessonId; // Use as string
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return res.status(404).send('Lesson not found');
  
  const prog = progressData[lessonId];
  
  // Update mastery threshold if provided
  const newThreshold = parseInt(req.body.masteryThreshold);
  if (!isNaN(newThreshold) && newThreshold > 0) {
    prog.masteryThreshold = newThreshold;
    saveProgress();
  }
  const masteryThreshold = prog.masteryThreshold;

  if (prog.queue.length === 0) {
    return res.json({ message: 'Lesson completed' });
  }
  
  // Remove the current question from the head of the queue.
  const currentQuestionId = prog.queue.shift();
  const qProgress = prog.questions[currentQuestionId];
  const answerResult = req.body.result;
  let offset = 0;
  let rewardFile = null;
  
  if (answerResult === 'correct') {
    offset = 5 + 5 * (qProgress.consecutiveCorrect * 2);
    qProgress.consecutiveCorrect++;
    qProgress.totalCorrect++;
    if (qProgress.consecutiveCorrect === 5) {
      rewardFile = addMediaReward(lessonId);
    }
  } else {
    offset = 3;
    qProgress.consecutiveCorrect = 0;
  }
  
  if (qProgress.consecutiveCorrect < masteryThreshold) {
    const newPosition = Math.min(offset, prog.queue.length);
    prog.queue.splice(newPosition, 0, currentQuestionId);
  } else {
    console.log(`Question ${currentQuestionId} mastered for lesson ${lessonId}`);
  }
  
  saveProgress();
  
  if (prog.queue.length === 0) {
    return res.json({ message: 'Lesson completed', rewardFile });
  }
  const nextQuestionId = prog.queue[0];
  const nextQuestion = lesson.questions.find(q => q.id === nextQuestionId);
  res.json({ nextQuestion, progress: prog.questions[nextQuestionId], rewardFile });
});


app.get('/lesson/:lessonId/media', (req, res) => {
  const lessonId = req.params.lessonId; // now a string like "animals"
  const prog = progressData[lessonId];
  const rewards = prog && prog.rewards ? prog.rewards : [];
  res.render('media', { rewards, lessonId });
});

app.get('/reward', (req, res) => {
  const fileEncoded = req.query.file;
  if (!fileEncoded) {
    return res.status(400).send('Missing file parameter');
  }
  let filePath;
  try {
    filePath = Buffer.from(fileEncoded, 'base64').toString('utf-8');
  } catch (err) {
    return res.status(400).send('Invalid file parameter');
  }
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }
  // Send the file to the client.
  res.sendFile(filePath);
});

app.post('/lesson/:lessonId/reset', (req, res) => {
  const lessonId = req.params.lessonId; // Using the stable string ID
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return res.status(404).send('Lesson not found');

  const prog = progressData[lessonId];

  // Reset progress for each question: set consecutiveCorrect and totalCorrect to 0.
  lesson.questions.forEach(q => {
    prog.questions[q.id] = {
      consecutiveCorrect: 0,
      totalCorrect: 0
    };
  });

  // Reinitialize the queue to contain all question IDs in the original order.
  prog.queue = lesson.questions.map(q => q.id);

  // Save the updated progress.
  saveProgress();

  res.json({ message: 'Lesson progress reset' });
});

app.post('/lesson/:lessonId/updateQuestions', (req, res) => {
  const lessonId = req.params.lessonId; // Stable string ID
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

  const updatedQuestions = req.body.updatedQuestions;
  if (!Array.isArray(updatedQuestions)) {
    return res.status(400).json({ message: 'Invalid questions data' });
  }

  // Reassign question IDs sequentially (starting at 1) and update lesson.questions.
  // Also, preserve existing progress if a matching tempId is found.
  const newQuestions = [];
  updatedQuestions.forEach((qData, index) => {
    const newId = index + 1; // new numeric id for the question
    // Try to preserve progress if an old question had the same tempId.
    let existingProgress = {};
    if (progressData[lessonId] && progressData[lessonId].questions[qData.tempId]) {
      existingProgress = progressData[lessonId].questions[qData.tempId];
    }
    newQuestions.push({
      id: newId,
      question: qData.question,
      answer: qData.answer,
      help: qData.help,
      audio: qData.audio || null
    });
    // Also, update progressData for this question.
    if (!progressData[lessonId].questions) {
      progressData[lessonId].questions = {};
    }
    // Save progress using newId as key.
    // If existing progress exists (from a previous question with same tempId), keep it; otherwise, default.
    progressData[lessonId].questions[newId] = existingProgress.consecutiveCorrect !== undefined
      ? existingProgress
      : { consecutiveCorrect: 0, totalCorrect: 0 };
  });

  // Replace lesson.questions with newQuestions.
  lesson.questions = newQuestions;

  // For simplicity, set the lesson's queue to be all questions in order.
  progressData[lessonId].queue = newQuestions.map(q => q.id);

  // Now, rebuild the entire qa.txt file from the lessons array.
  // (Assuming qa.txt contains all lessons in order, with each lesson starting with a line like "@id:animals Lesson About Animals"
  // followed by question lines.)
  let newQaContent = '';
  lessons.forEach(lessonItem => {
    newQaContent += `@id:${lessonItem.id} ${lessonItem.title}\n`;
    lessonItem.questions.forEach(q => {
      // Build each question line as: Question<TAB>Answer<TAB>Help<TAB>Audio (if audio exists)
      let line = `${q.question}\t${q.answer}`;
      if (q.help || q.audio) {
        line += `\t${q.help || ''}`;
      }
      if (q.audio) {
        line += `\t${q.audio}`;
      }
      newQaContent += line + '\n';
    });
    newQaContent += '\n'; // extra newline between lessons
  });

  // Write the new content to qa.txt.
  const qaFilePath = path.join(__dirname, 'qa.txt');
  fs.writeFileSync(qaFilePath, newQaContent, 'utf-8');

  // Save progress.json with updated progress.
  saveProgress();

  res.json({ message: 'Lesson questions updated successfully' });
});

// Add Lesson
app.post('/addLesson', (req, res) => {
  const { lessonId, lessonTitle, lessonContent } = req.body;
  if (!lessonId || !lessonTitle) {
    return res.status(400).json({ message: 'Lesson ID and title are required.' });
  }
  // Parse lessonContent: split by newline and assume each non-empty line is a question line.
  const lines = lessonContent.split(/\r?\n/).filter(line => line.trim() !== '');
  const questions = lines.map(line => {
    const parts = line.split('\t');
    return {
      id: 0, // will reassign later
      question: parts[0].trim(),
      answer: parts[1] ? parts[1].trim() : '',
      help: parts[2] ? parts[2].trim() : '',
      audio: parts[3] ? parts[3].trim() : null
    };
  });
  // Create a new lesson object.
  const newLesson = {
    id: lessonId,
    title: lessonTitle,
    questions: questions
  };
  lessons.push(newLesson);
  
  // Create default progress for the new lesson.
  progressData[lessonId] = {
    queue: [],
    questions: {},
    masteryThreshold: 3,
    rewards: []
  };
  newLesson.questions.forEach((q, index) => {
    const newId = index + 1;
    q.id = newId;
    progressData[lessonId].questions[newId] = { consecutiveCorrect: 0, totalCorrect: 0 };
    progressData[lessonId].queue.push(newId);
  });
  
  

  // Append the new lesson to qa.txt.
  // (Append a blank line before, then the lesson header, then the questions.)
  const qaFilePath = path.join(__dirname, 'qa.txt');
  let lessonText = `\n@id:${lessonId} ${lessonTitle}\n`;
  newLesson.questions.forEach(q => {
    let line = `${q.question}\t${q.answer}`;
    if (q.help || q.audio) {
      line += `\t${q.help || ''}`;
    }
    if (q.audio) {
      line += `\t${q.audio}`;
    }
    lessonText += line + '\n';
  });
  fs.appendFileSync(qaFilePath, lessonText, 'utf-8');

  saveProgress();
  res.json({ message: 'Lesson added successfully.' });
});

// Configure multer storage for the media directory.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'embeds'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

app.post('/uploadEmbed', (req, res) => { 
  upload.single('media')(req, res, (err) => {
    if (err) {
      return res.json({ error: err });
    } else {
      if (!req.file) {
        return res.json({ error: 'No file selected!' });
      } else {
        return res.json({
          filepath: `/embeds/${req.file.filename}`, 
          type: req.file.mimetype
        });
      }
    }
  });
});


// Start the server.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});