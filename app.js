// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/timetable_app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Create Schema
const scheduleSchema = new mongoose.Schema({
    subjectName: String,
    teachingStaff: String,
    lecturesPerWeek: Number,
    lectureDuration: Number
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/schedule', async (req, res) => {
    const schedule = new Schedule({
        subjectName: req.body.subjectName,
        teachingStaff: req.body.teachingStaff,
        lecturesPerWeek: req.body.lecturesPerWeek,
        lectureDuration: req.body.lectureDuration
    });
    
    try {
        await schedule.save();
        res.send('Schedule details saved successfully!');
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
