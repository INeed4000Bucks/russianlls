const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

// Serve static files from public directory
app.use(express.static('public'));

// Serve dictionary files - add this line
app.use('/data/dictionaries', express.static(path.join(__dirname, 'data/dictionaries')));

const lessonsRouter = require('./routes/lessons');
app.use('/', lessonsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});