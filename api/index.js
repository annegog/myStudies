const mongoose = require('mongoose');
const Express = require('express');
const cors = require('cors');
require('dotenv').config();

const User = require('./Models/User');
const Course = require('./Models/Course');
const app = Express();

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

app.listen(4000, () => {
    console.log(`Server is running`);
});

// app.get('/test', (req, res) => {
//     res.json('test');
// });

app.get('/test', async (req, res) => {
    try {
        const user1 = new User({
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
            phone: 1234567890,
            email: 'john@example.com',
            password: 'password123',
            role: 'student',
            am: 12345,
        });

        const user2 = new User({
            first_name: 'Jane',
            last_name: 'Doe',
            username: 'jane_doe',
            phone: 9876543210,
            email: 'jane@example.com',
            password: 'password456',
            role: 'professor',
            am: 67890,
        });

        // Save users to the database
        await user1.save();
        await user2.save();

        // Create sample course
        const course1 = new Course({
            title: 'Introduction to Programming',
            id_course: 'CS101',
            ects: 6,
            semester: 1,
            professors: [user2._id], // Link to professor user2
            books: ['Programming Book 101', 'Programming Book 200'],
            hours: 60,
            mandatory: true,
            lab: false,
            general: false,
            direction: '',
            major: '',
            project: false,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        await course1.save();

        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error.message);
    }
});
