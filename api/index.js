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
const jwtSecretUser = process.env.JWT_SECRET_USER;

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

/************************************** USERS ****************************************************/

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

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.get('/student/profile', verifyJWTuser, (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecretUser, {}, async (err, userData) => {
            if (err) throw err;
            if (userData && userData.id) {
                const user = await User.findById(userData.id);
                res.json(user);
            } else {
                res.json(null);
            }
        });
    } else {
        res.json(null);
    }
});

app.get('/student/:id', verifyJWTuser, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).exec();
        console.log(user);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching User' });
    }
});

/************************************** Courses **************************************************/

// Getting all the courses from the database

app.get('/api/courses', verifyJWTuser, async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching course data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/declarationsOpen', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecretUser, {}, async (err, userData) => {
            if (err) throw err;
            if (userData && userData.id) {
                const user = await User.findById(userData.id);
                res.json(user);
            } else {
                res.json(null);
            }
        });
    } else {
        res.json(null);
    }
});


/************************************** DATA ****************************************************/

// Inserting data to our database - test users and courses.
// All Users have the same password "pass123"

app.get('/data', async (req, res) => {
    try {
        const student1 = new User({
            first_name: 'Δημήτρης',
            last_name: 'Αντωνίου',
            username: 'sdi2400001',
            email: 'sdi2400001@example.com',
            password: bcrypt.hashSync('pass123', bcryptSalt),
            role: 'student',
            am: 'sdi2400001',
            father: 'Αντώνης',
            mother: 'Αντωνία',
            birth_date: '23/06/2006',
            family: 'Άγαμος',
            siblings: 0,
            army: 'Όχι',
            birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
            ID: 'AK336699',
            ID_location: 'Κερατσινίου',
            AMKA: 23060622553,
            home: 'Αιόλου 45',
            city: 'Αθήνα',
            phone: 6977553311,
            postal: 55443,
            temp_home: '-',
            temp_city: '-',
            temp_phone: '-',
            postal_temp: '-',
        });

        const student2 = new User({
            first_name: 'Ορέστης',
            last_name: 'Πίνας',
            username: 'sdi2000122',
            email: 'sdi2000122@example.com',
            password: bcrypt.hashSync('pass123', bcryptSalt),
            role: 'student',
            am: 'sdi2000122',
            father: 'Γιάννης',
            mother: 'Φωτεινή',
            birth_date: '11/09/2002',
            family: 'Άγαμος',
            siblings: 2,
            army: 'Όχι',
            birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
            ID: 'AI456773',
            ID_location: 'Αθηνών',
            AMKA: 11090211559,
            home: 'Αθήνας 44',
            city: 'Αθήνας',
            phone: 6911223344,
            postal: 11111,
            temp_home: '-',
            temp_city: '-',
            temp_phone: '-',
            postal_temp: '-',
        });

        const student3 = new User({
            first_name: 'Βασιλική',
            last_name: 'Ευσταθίου',
            username: 'sdi2400012',
            email: 'sdi2400012@example.com',
            password: bcrypt.hashSync('pass123', bcryptSalt),
            role: 'student',
            am: 'sdi2400012',
            father: 'Μάρκος',
            mother: 'Νίκη',
            birth_date: '22/12/2006',
            family: 'Άγαμη',
            siblings: 1,
            army: 'Όχι',
            birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
            ID: 'AK456456',
            ID_location: 'Πειραιά',
            AMKA: 22120623355,
            home: 'Αιόλου 45',
            city: 'Αθήνα',
            phone: 6988774411,
            postal: 12345,
            temp_home: '-',
            temp_city: '-',
            temp_phone: '-',
            postal_temp: '-',
        });

        const student4 = new User({
            first_name: 'Μαρία',
            last_name: 'Δημητρίου',
            username: 'sdi2400222',
            email: 'sdi2400222@example.com',
            password: bcrypt.hashSync('pass123', bcryptSalt),
            role: 'student',
            am: 'sdi2400222',
            father: 'Φώτης',
            mother: 'Άννα',
            birth_date: '12/05/2006',
            family: 'Άγαμη',
            siblings: 1,
            army: 'Όχι',
            birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
            ID: 'AK123123',
            ID_location: 'Ηλιούπολης',
            AMKA: 12050622222,
            home: 'Δυδίτου 3',
            city: 'Ηλιούπολη',
            phone: 6912312312,
            postal: 32154,
            temp_home: '-',
            temp_city: '-',
            temp_phone: '-',
            postal_temp: '-',
        });

        const student5 = new User({
            first_name: 'Γιάννης',
            last_name: 'Κόλιας',
            username: 'sdi1500012',
            email: 'sdi1500012@example.com',
            password: bcrypt.hashSync('pass123', bcryptSalt),
            role: 'student',
            am: 'sdi1500012',
            father: 'Βασίλης',
            mother: 'Κατερίνα',
            birth_date: '23/12/1997',
            family: 'Άγαμος',
            siblings: 1,
            army: 'Ναί',
            birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
            ID: 'AK789789',
            ID_location: 'Ελληνικό',
            AMKA: 23129789977,
            home: 'Άπρας 5',
            city: 'Ελληνικό',
            phone: 6978978978,
            postal: 45677,
            temp_home: '-',
            temp_city: '-',
            temp_phone: '-',
            postal_temp: '-',
        });

        const student6 = new User({
            first_name: 'Άννα',
            last_name: 'Αρτεμίου',
            username: 'sdi1900125',
            email: 'sdi1900125@example.com',
            password: bcrypt.hashSync('pass123', bcryptSalt),
            role: 'student',
            am: 'sdi1900125',
            father: 'Βασίλης',
            mother: 'Ελένη',
            birth_date: 23/1/2001,
            family: 'Άγαμη',
            siblings: 1,
            army: 'Ναί',
            birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
            ID: 'AK789789',
            ID_location: 'Μαρούσι',
            AMKA: 23010111111,
            home: 'Μαρουσίου 5',
            city: 'Μαρούσι',
            phone: 6945632232,
            postal: 45655,
            temp_home: '-',
            temp_city: '-',
            temp_phone: '-',
            postal_temp: '-',
        });

        const professor = new User({
            first_name: 'Νικόλαος',
            last_name: 'Πέτρας',
            username: 'nickpetras',
            email: 'nickpetras@example.com',
            password: bcrypt.hashSync('pass123', bcryptSalt),
            role: 'professor',
            am: 'nickpetras',
            father: 'Γιώργος',
            mother: 'Μαρία',
            birth_date: '11/12/1980',
            family: 'Άγαμος',
            siblings: '-',
            army: 'Ναί',
            birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
            ID: 'AI998877',
            ID_location: 'Ηλιούπολης',
            AMKA: 11128000221,
            home: 'Φίφης 2',
            city: 'Αθήνα',
            phone: 6911223344,
            postal: 12345,
            temp_home: '-',
            temp_city: '-',
            temp_phone: '-',
            postal_temp: '-',
        });

        const major1 = new Course({
            title: 'Γραμμική Άλγεβρα',
            id_course: 'Y01',
            ects: 6,
            semester: 1,
            professors: 'Ορέστης Νίκου',
            books: ['Γραμμική Άλγεβρα 1', 'Γραμμική Άλγεβρα 2'],
            hours: 40,
            mandatory: true,
            lab: false,
            general: false,
            direction: '',
            major: 'Υποχρεωτικό',
            project: false,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const major2 = new Course({
            title: 'Εισαγωγή στον Προγραμματισμό',
            id_course: 'Y02',
            ects: 7,
            semester: 1,
            professors: [professor._id],
            books: ['Εισαγωγή 1', 'Εισαγωγή 2'],
            hours: 48,
            mandatory: true,
            lab: false,
            general: false,
            direction: '',
            major: 'Υποχρεωτικό',
            project: true,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const major3 = new Course({
            title: 'Ανάλυση I',
            id_course: 'Y03',
            ects: 8,
            semester: 2,
            professors: 'Μαρία Φράγκου',
            books: ['Ανάλυση 1', 'Ανάλυση 2'],
            hours: 48,
            mandatory: true,
            lab: false,
            general: false,
            direction: '',
            major: 'Υποχρεωτικό',
            project: false,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const major4 = new Course({
            title: 'Δομές Δεδομένων και Τεχνικές Προγραμματισμού',
            id_course: 'Y04',
            ects: 7,
            semester: 2,
            professors: 'Βασίλης Κάζας',
            books: ['Δομές 1', 'Δομές 2'],
            hours: 50,
            mandatory: true,
            lab: true,
            general: false,
            direction: '',
            major: 'Υποχρεωτικό',
            project: true,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const major5 = new Course({
            title: 'Αντικειμενοστραφής Προγραμματισμός',
            id_course: 'Y05',
            ects: 8,
            semester: 3,
            professors: [professor._id],
            books: ['Αντικειμενοστραφής 1', 'Αντικειμενοστραφής 2'],
            hours: 60,
            mandatory: true,
            lab: true,
            general: false,
            direction: '',
            major: 'Υποχρεωτικό',
            project: true,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const major6 = new Course({
            title: 'Πιθανότητες και Στατιστική ',
            id_course: 'Y06',
            ects: 6,
            semester: 3,
            professors: 'Ελένη Μασούτη',
            books: ['Πιθανότητες 1', 'Πιθανότητες 2'],
            hours: 48,
            mandatory: true,
            lab: false,
            general: false,
            direction: '',
            major: 'Υποχρεωτικό',
            project: false,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const major7 = new Course({
            title: 'Αλγόριθμοι και Πολυπλοκότητα',
            id_course: 'Y07',
            ects: 8,
            semester: 4,
            professors: 'Βασίλειος Αποστόλου',
            books: ['Αλγόριθμοι 1', 'Αλγόριθμοι 2'],
            hours: 48,
            mandatory: true,
            lab: false,
            general: false,
            direction: '',
            major: 'Υποχρεωτικό',
            project: true,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const major8 = new Course({
            title: 'Σχεδίαση και Χρήση Βάσεων Δεδομένων',
            id_course: 'Y08',
            ects: 7,
            semester: 1,
            professors: 'Γεώργιος Πάνου',
            books: ['Βάσεις 1', 'Βάσεις 2'],
            hours: 56,
            mandatory: true,
            lab: false,
            general: false,
            direction: '',
            major: 'Υποχρεωτικό',
            project: true,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const choice1 = new Course({
            title: 'Αρχές Γλωσσών Προγραμματισμού',
            id_course: 'E01',
            ects: 6,
            semester: 5,
            professors: [professor._id],
            books: ['Αρχές 1', 'Αρχές 2'],
            hours: 48,
            mandatory: true,
            lab: true,
            general: false,
            direction: '',
            major: '',
            project: true,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const choice2 = new Course({
            title: 'Τεχνικές Εξόρυξης Δεδομένων',
            id_course: 'E02',
            ects: 6,
            semester: 6,
            professors: 'Αντώνης Βασιλείου',
            books: ['Τεχνικές 1', 'Τεχνικές 2'],
            hours: 48,
            mandatory: true,
            lab: true,
            general: false,
            direction: '',
            major: 'Επιλογής',
            project: true,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const choice3 = new Course({
            title: 'Επικοινωνία Ανθρώπου Μηχανής',
            id_course: 'E03',
            ects: 6,
            semester: 7,
            professors: 'Αντώνης Βασιλείου',
            books: ['Επικοινωνία 1', 'Επικοινωνία 2'],
            hours: 48,
            mandatory: true,
            lab: true,
            general: false,
            direction: '',
            major: 'Επιλογής',
            project: true,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const choice4 = new Course({
            title: 'Καινοτομία και Επιχειρηματικότητα ',
            id_course: 'E04',
            ects: 4,
            semester: 8,
            professors: 'Αντώνης Βασιλείου',
            books: ['Καινοτομία 1', 'Καινοτομία 2'],
            hours: 40,
            mandatory: true,
            lab: false,
            general: false,
            direction: '',
            major: 'Επιλογής',
            project: false,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const lab1 = new Course({
            title: 'Εργαστήριο Λογικής Σχεδίασης',
            id_course: 'EP01',
            ects: 2,
            semester: 1,
            professors: 'Αλέξης Ρούπας',
            books: ['Εργαστήριο 1', 'Εργαστήριο 2'],
            hours: 40,
            mandatory: true,
            lab: true,
            general: false,
            direction: '',
            major: 'Εργαστήριο',
            project: false,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const lab2 = new Course({
            title: 'Εργαστήριο Κυκλωμάτων και Συστημάτων',
            id_course: 'EP02',
            ects: 2,
            semester: 3,
            professors: 'Λάμπρος Σήμου',
            books: ['Εργαστήριο 1', 'Εργαστήριο 2'],
            hours: 40,
            mandatory: true,
            lab: true,
            general: false,
            direction: '',
            major: 'Εργαστήριο',
            project: false,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        const lab3 = new Course({
            title: 'Εργαστήριο Δικτύων Επικοινωνιών I',
            id_course: 'EP03',
            ects: 2,
            semester: 4,
            professors: 'Πέτρος Μαχαίρας',
            books: ['Εργαστήριο 1', 'Εργαστήριο 2'],
            hours: 40,
            mandatory: true,
            lab: true,
            general: false,
            direction: '',
            major: 'Εργαστήριο',
            project: false,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        // Save to the database
        Promise.all(
            [
                student1.save(), student2.save(), student3.save(), student4.save(), student5.save(), student6.save(), professor.save(),
                major1.save(), major2.save(), major3.save(), major4.save(), major5.save(), major6.save(), major7.save(), major8.save(),
                choice1.save(), choice2.save(), choice3.save(), choice4.save(),
                lab1.save(), lab2.save(), lab3.save(),
            ])
            .then(() => {
                console.log('Sample courses created successfully');
            })
            .catch((error) => {
                console.error('Error creating sample courses:', error);
            });

        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error.message);
    }
});