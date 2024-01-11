const mongoose = require('mongoose');
const Express = require('express');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


require('dotenv').config();

const User = require('./Models/User');
const Course = require('./Models/Course');
const app = Express();

const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecretUser = "jwtSecretUser1";
app.use(Express.json());
app.use(cookieParser());

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

app.get('/test1', (req, res) => {
    res.json('test');
});

/// verification functions for user
const verifyJWTuser = (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecretUser, {}, async (err, userData) => {
            if (err) {
                return res.status(401).json({ error: 'User Token verification failed' });
            }
            req.id = userData.id;
            // console.log("correct verification for user ")
            next();
        });
    } else {
        res.status(401).json({ error: 'Token for user not provided' });
    }
};

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    
    if (userDoc) {
        const passOK = bcrypt.compareSync(password, userDoc.password);
        if (passOK) {
            jwt.sign({
                username: userDoc.username,
                id: userDoc._id
            }, jwtSecretUser, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });

        } else {
            res.status(422).json('Wrong password');
        }
    } else {
        res.status(404).json('User not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecretUser, {}, async (err, userData) => {
            // if (err) throw err;
            if (userData && userData.id) {
                const { first_name, last_name, username, phone, email, role, am } = await User.findById(userData.id); //fetch from the database
                res.json({ first_name, last_name, username, phone, email, role, am });
            } else {
                res.json(null);
            }
        });
    } else {
        res.json(null);
    }
});

app.get('/courses', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecretUser, {}, async (err, userData) => {
            if (userData && userData.id) {
                res.json(userData);
            } else {
                res.json(null);
            }
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.get('/test', async (req, res) => {
    try {
        const user1 = new User({
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
            phone: 1234567890,
            email: 'john@example.com',
            password: bcrypt.hashSync('password123', bcryptSalt),
            role: 'student',
            am: 12345,
        });

        const user2 = new User({
            first_name: 'Jane',
            last_name: 'Doe',
            username: 'jane_doe',
            phone: 9876543210,
            email: 'jane@example.com',
            password: bcrypt.hashSync('password456', bcryptSalt),
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
