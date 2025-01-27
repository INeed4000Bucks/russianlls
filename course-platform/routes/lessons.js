const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const lessonsData = require('../data/lessons.json');

// Helper function to load dictionary
function loadDictionary(dictionaryFile) {
    try {
        const dictionary = require(`../data/${dictionaryFile}`);
        return dictionary;
    } catch (error) {
        console.error(`Error loading dictionary file ${dictionaryFile}:`, error);
        return {};
    }
}

router.get('/', (req, res) => {
    res.render('index', { lessons: lessonsData.lessons });
});

router.get('/lesson/:id', (req, res) => {
    const lesson = lessonsData.lessons.find(l => l.id === req.params.id);
    if (!lesson) return res.status(404).send('Lesson not found');
    
    // Load the dictionary for this lesson
    const dictionary = loadDictionary(lesson.dictionary);
    
    // Set the initial current section to the first section's ID
    const currentSection = lesson.sections[0]?.id || null;
    
    res.render('lesson', { 
        lesson,
        currentSection,
        lessonId: lesson.id,
        dictionary: JSON.stringify(dictionary).replace(/'/g, "\\'") // Escape single quotes
    });
});

module.exports = router;