// public/js/lesson.js
document.addEventListener('DOMContentLoaded', () => {
  const questionCard = document.getElementById('question-card');
  const answerText = document.getElementById('answer-text');
  const revealButton = document.getElementById('reveal-button');
  const correctButton = document.getElementById('correct-button');
  const incorrectButton = document.getElementById('incorrect-button');
  const masteryThresholdInput = document.getElementById('masteryThreshold');

  let answerShowing = false;

  // Reveal the answer, hint, and (if applicable) play the audio.
  function revealAnswer() {
    answerShowing = true;
    if (answerText.style.display !== 'block') {
      answerText.style.display = 'block';
      revealButton.style.display = 'none';
      document.querySelector('.answer-buttons').style.display = 'block';
      const questionTextDiv = document.querySelector('.question-text');
      const audioElem = questionTextDiv ? questionTextDiv.querySelector('audio') : null;
      if (audioElem) {
        audioElem.pause();
        audioElem.currentTime = 0;
      }
      const answerAudioElem = answerText.querySelector('audio');
      if (answerAudioElem) {
        answerAudioElem.play();
      }
    } else {
      console.log("answerText.style.display was already block");
    }
  }

  if (revealButton) revealButton.addEventListener('click', revealAnswer);
  if (questionCard) questionCard.addEventListener('click', () => {
    if (!answerShowing) {
      revealAnswer();
    } else {
      submitAnswer('correct');
      answerShowing = false;
    }
  });

  // Upload audio file handling for each "Upload" button in the modal.
  function setupAudioUploadListeners() {
    const uploadButtons = document.querySelectorAll('.upload-audio-button');
    uploadButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Find the sibling file input and trigger click.
        const parentTd = button.parentElement;
        const fileInput = parentTd.querySelector('input[type="file"][name="audioFile"]');
        if (fileInput) {
          fileInput.click();
        }
      });
    });

    // When a file is selected, upload it.
    const fileInputs = document.querySelectorAll('input[type="file"][name="audioFile"]');
    fileInputs.forEach(input => {
      input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        // Create FormData and append the file.
        const formData = new FormData();
        formData.append('audioFile', file);
        // Optionally, you can append the lessonId if needed.
        formData.append('lessonId', window.lessonId);
        // Send via fetch to the upload endpoint.
        fetch('/uploadAudio', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Set the sibling text input's value to the saved filename.
            const parentTd = input.parentElement;
            const textInput = parentTd.querySelector('input[type="text"][name="audio"]');
            if (textInput) {
              textInput.value = data.filename;
            }
          } else {
            alert('Audio upload failed: ' + data.message);
          }
        })
        .catch(err => {
          console.error('Error uploading audio:', err);
          alert('Error uploading audio.');
        });
      });
    });
  }
  // Call once
  setupAudioUploadListeners();

  // Listen for keyboard shortcuts.
  document.addEventListener('keydown', (e) => {
    const editModal = document.getElementById('edit-questions-modal');
    if (editModal && editModal.style.display === 'block') {
      return; // Skip processing space, 1, 2 keys when editing.
    }
    if (e.code === 'Space') {
      if (!answerShowing) {
        revealAnswer();
        e.preventDefault();
      }
      else {
        submitAnswer('correct');
        answerShowing = false;
      }
    }
    if (e.key === '1') {
      submitAnswer('correct');
    }
    if (e.key === '2') {
      submitAnswer('incorrect');
    }
    if (e.altKey && e.key.toLowerCase() === 'm') {
      e.preventDefault();
      // Make a POST request to the reset route for the current lesson.
      fetch(`/lesson/${window.lessonId}/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          // Reload the page to start the lesson over.
          location.reload();
        })
        .catch(err => console.error('Error resetting lesson:', err));
    }
    if (e.altKey && e.key.toLowerCase() === 'n') {
      e.preventDefault();
      openEditQuestionsModal();
    }
  });

  if (correctButton) {
    correctButton.addEventListener('click', () => submitAnswer('correct'));
  }
  if (incorrectButton) {
    incorrectButton.addEventListener('click', () => submitAnswer('incorrect'));
  }

  // Submit the answer to the server via AJAX.
  function submitAnswer(result) {
    // Pause and reset any playing audio.
    const audioElem = document.getElementById('question-audio');
    if (audioElem) {
      audioElem.pause();
      audioElem.currentTime = 0;
    }
    const masteryThreshold = masteryThresholdInput ? masteryThresholdInput.value : 3;
    fetch(window.location.pathname + '/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ result, masteryThreshold })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message && data.message === 'Lesson completed') {
          document.querySelector('.container').innerHTML =
            '<h2>Lesson completed for today!</h2>';
        } else if (data.nextQuestion) {
          // For simplicity, reload the page to show the next question.
          location.reload();
        }
      })
      .catch(err => console.error(err));
  }

  const questionTextDivOnLoad = document.querySelector('.question-text'); // Find question-text div
  const questionAudioOnLoad = questionTextDivOnLoad ? questionTextDivOnLoad.querySelector('audio') : null; // Find audio within it
  if (questionAudioOnLoad) {
    questionAudioOnLoad.play().catch(error => {
      // Autoplay was prevented. May happen in some browsers depending on settings.
      console.warn("Autoplay prevented for question audio:", error);
    });
  }

  function openEditQuestionsModal() {
    const modal = document.getElementById('edit-questions-modal');
    modal.style.display = 'block';
  }

  function closeEditQuestionsModal() {
    const modal = document.getElementById('edit-questions-modal');
    modal.style.display = 'none';
  }

  // Close modal when clicking on the X button.
  const closeBtn = document.getElementById('close-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeEditQuestionsModal);
  }

  // Add event listeners for remove, move up, move down buttons within the table.
  document.getElementById('questions-table').addEventListener('click', function(e) {
    const target = e.target;
    const row = target.closest('tr');
    if (!row) return;
    if (target.classList.contains('remove-row-button')) {
      row.parentNode.removeChild(row);
    } else if (target.classList.contains('move-up-button')) {
      const prevRow = row.previousElementSibling;
      if (prevRow) row.parentNode.insertBefore(row, prevRow);
    } else if (target.classList.contains('move-down-button')) {
      const nextRow = row.nextElementSibling;
      if (nextRow) row.parentNode.insertBefore(nextRow, row);
    }
  });
  // Function to attach embedded-media support to a given input (a textarea)
  function setupEmbedMediaInput(input) {
    input.addEventListener('click', function(e) {
      const text = input.value;
      const clickPosition = input.selectionStart;
      const start = text.lastIndexOf('[', clickPosition);
      const end = text.indexOf(']', clickPosition);
      if (start !== -1 && end !== -1 && start < clickPosition && clickPosition <= end) {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.accept = 'image/*,video/*,audio/*';
        
        fileInput.addEventListener('change', async () => {
          const files = fileInput.files;
          if (!files || files.length === 0) return;
          let newFilePaths = [];
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const formData = new FormData();
            formData.append('media', file);
            try {
              const response = await fetch('/uploadEmbed', {
                method: 'POST',
                body: formData
              });
              const data = await response.json();
              if (data.error) {
                alert(data.error);
                continue;
              }
              newFilePaths.push(data.filepath);
            } catch (err) {
              console.error('Upload failed:', err);
              alert('Upload failed. Please try again.');
            }
          }
          const replacement = '[' + newFilePaths.join(', ') + ']';
          const newText = text.substring(0, start) + replacement + text.substring(end + 1);
          input.value = newText;
        });
        
        fileInput.click();
      }
    });
  }

  // Attach the embedded-media functionality to all embed-inputs when the modal loads.
  document.querySelectorAll('.embed-input').forEach(input => {
    setupEmbedMediaInput(input);
  });

  // Add a new row when the "Add Question" button is clicked.
  document.getElementById('add-row-button').addEventListener('click', () => {
    const tbody = document.querySelector('#questions-table tbody');
    const tempId = "new_" + Date.now(); // Unique temporary ID.
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-temp-id', tempId);
    newRow.innerHTML = `
      <td>New</td>
      <td>
        <textarea name="question" class="embed-input" placeholder="Enter question text. Use [] to embed media."></textarea>
      </td>
      <td>
        <textarea name="answer" class="embed-input" placeholder="Enter answer text. Use [] to embed media."></textarea>
      </td>
      <td>
        <textarea name="hint" class="embed-input" placeholder="Enter hint text. Use [] to embed media."></textarea>
      </td>
      <td>
        <button type="button" class="remove-row-button">×</button>
        <button type="button" class="move-up-button">↑</button>
        <button type="button" class="move-down-button">↓</button>
      </td>
    `;
    tbody.appendChild(newRow);
    setupEmbedMediaInput(newRow.querySelector('.embed-input'));
  });  

  // Handle form submission for updated questions.
  const editForm = document.getElementById('edit-questions-form');
  editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Gather updated questions from the table.
    const rows = document.querySelectorAll('#questions-table tbody tr');
    const updatedQuestions = [];
    rows.forEach((row, index) => {
      const tempId = row.getAttribute('data-temp-id');
      // Use querySelector for textareas instead of input.
      const questionEl = row.querySelector('textarea[name="question"]');
      const answerEl = row.querySelector('textarea[name="answer"]');
      const hintEl = row.querySelector('textarea[name="hint"]');
      // If any of these elements are missing, skip this row.
      if (!questionEl || !answerEl) return;
      
      // Optionally, convert actual newline characters to literal "\n"
      const questionText = questionEl.value.replace(/\r?\n/g, '\\n').trim();
      const answerText = answerEl.value.replace(/\r?\n/g, '\\n').trim();
      const hintText = hintEl.value.replace(/\r?\n/g, '\\n').trim();
      
      updatedQuestions.push({
        tempId: tempId,
        question: questionText,
        answer: answerText,
        help: hintText
      });
    });
  
    // Send the updated questions to the server.
    fetch(`/lesson/${window.lessonId}/updateQuestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ updatedQuestions: updatedQuestions })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      location.reload();
    })
    .catch(err => console.error('Error updating questions:', err));
  });  
});