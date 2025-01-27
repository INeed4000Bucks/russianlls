const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

// Helper function to load all lessons
async function loadLessons() {
    const lessonsDir = path.join(__dirname, '../data/lessons');
    try {
        const files = await fs.readdir(lessonsDir);
        const lessonFiles = files.filter(file => file.endsWith('.json'));
        
        const lessons = await Promise.all(
            lessonFiles.map(async file => {
                const filePath = path.join(lessonsDir, file);
                const data = await fs.readFile(filePath, 'utf8');
                return JSON.parse(data);
            })
        );
        
        return lessons;
    } catch (error) {
        console.error('Error loading lessons:', error);
        return [];
    }
}

// Helper function to load dictionary
function loadDictionary(dictionaryFile) {
    try {
        const dictionary = require(`../data/dictionaries/${dictionaryFile}`);
        return dictionary;
    } catch (error) {
        console.error(`Error loading dictionary file ${dictionaryFile}:`, error);
        return {};
    }
}

// Helper function to load specific lesson
async function loadLesson(lessonId) {
    try {
        const lessonPath = path.join(__dirname, `../data/lessons/${lessonId}.json`);
        const data = await fs.readFile(lessonPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading lesson ${lessonId}:`, error);
        return null;
    }
}

router.get('/', async (req, res) => {
    const lessons = await loadLessons();
    res.render('index', { lessons });
});

router.get('/lesson/:id', async (req, res) => {
    const lesson = await loadLesson(req.params.id);
    if (!lesson) return res.status(404).send('Lesson not found');
    
    const dictionary = loadDictionary(lesson.dictionary);
    const currentSection = lesson.sections[0]?.id || null;
    
    res.render('lesson', { 
        lesson,
        currentSection,
        lessonId: lesson.id,
        dictionary: JSON.stringify(dictionary).replace(/'/g, "\\'")
    });
});

module.exports = router;