const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const lessonsData = require('../data/lessons.json');

router.get('/', (req, res) => {
    res.render('index', { lessons: lessonsData.lessons });
});

router.get('/lesson/:id', (req, res) => {
    const lesson = lessonsData.lessons.find(l => l.id === req.params.id);
    if (!lesson) return res.status(404).send('Lesson not found');
    
    // Set the initial current section to the first section's ID
    const currentSection = lesson.sections[0]?.id || null;
    
    res.render('lesson', { 
        lesson,
        currentSection,
        lessonId: lesson.id // Add lessonId for the frontend
    });
});

module.exports = router;