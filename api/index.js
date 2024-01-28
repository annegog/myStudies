const mongoose = require('mongoose');
const Express = require('express');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const Grade = require('./Models/Grade');
const User = require('./Models/User');
const Course = require('./Models/Course');
const ExamsSeason = require('./Models/Examinations');
const Declaration = require('./Models/Declarations');
const CertificationRequest = require('./Models/CertificationRequest');

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

/************************************  User's verification functions ************************************/

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

/************************************  Users  ************************************/

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

app.post('/update-profile/:id', verifyJWTuser, async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
});

/************************************ Student ************************************/

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

/************************************ Declaration ************************************/

app.get('/declaration-season/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the latest declaration season for the user
        const latestDeclaration = await Declaration.findOne({ user: userId })
            .sort({ data: -1 })
            .populate('exam');

        // Find the ongoing exam season
        const currentDate = new Date();
        const ongoingExamSeason = await ExamsSeason.findOne({
            endData: { $gte: currentDate }
        });

        // Check if the declaration season is still open
        const isExamSeasonOngoing = !!ongoingExamSeason;

        if (!latestDeclaration || !latestDeclaration.exam) {
            // No declaration found
            return res.json({
                declaration: false,
                open: isExamSeasonOngoing,
                end_date: ongoingExamSeason ? ongoingExamSeason.endData : null
            });
        }

        // Check if the last declaration's exam season is the same as the on going exam season
        const isExamEndDateValid = latestDeclaration.exam._id === ongoingExamSeason._id;

        if (!isExamEndDateValid && latestDeclaration.exam.open === false) {
            // No valid exam end date found
            return res.json({
                declaration: false,
                open: isExamSeasonOngoing,
                end_date: ongoingExamSeason ? ongoingExamSeason.endData : null
            });
        }

        res.json({
            declaration: true,
            open: isExamSeasonOngoing,
            end_date: ongoingExamSeason ? ongoingExamSeason.endData : null,
            last_decl: latestDeclaration.data,
        });
    } catch (error) {
        console.error(error);
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

app.post('/save-declaration/:usersId', async (req, res) => {
    try {
        const userId = req.params.usersId;
        const { courses: courseTitles } = req.body;

        // Find the latest declaration season for the user
        const latestDeclaration = await Declaration.findOne({ user: userId }).sort({ data: -1 });

        // Find the exam season
        const currentDate = new Date();
        const examinationSemester = await ExamsSeason.findOne({
            endData: { $gte: currentDate }
        });

        if (latestDeclaration && latestDeclaration.exam) {
            // Check if the latest declaration's exam season is the same as the current one
            const isSameExamSeason = latestDeclaration.exam.equals(examinationSemester._id);

            if (isSameExamSeason) {
                // Remove the latest declaration if it belongs to the current exam season
                await Declaration.findByIdAndDelete(latestDeclaration._id);
            }
        }

        // Fetch course IDs based on the received course titles
        const courseObjects = await Course.find({ title: { $in: courseTitles } });
        const courseObjectIds = courseObjects.map(course => course._id);

        const declaration = new Declaration({
            courses: courseObjectIds,
            exam: examinationSemester._id,
            user: userId,
            data: currentDate
        });

        await declaration.save();

        res.status(200).json({ message: 'Declaration saved successfully' });
    } catch (error) {
        console.error('Error saving declaration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/************************************ Grades ************************************/

app.get('/api/grades/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentGrades = await Grade.find({ student: studentId }).populate('course').populate('grade');
        res.json(studentGrades);
    } catch (error) {
        console.error('Error fetching grades:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/************************************ Courses ************************************/

app.get('/api/courses', verifyJWTuser, async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching course data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/************************************ Certifications ************************************/

app.post('/certification-requests', verifyJWTuser, async (req, res) => {
    try {
        const certificationRequestData = req.body;

        const certificationRequest = new CertificationRequest(certificationRequestData);
        const savedCertificationRequest = await certificationRequest.save();
        res.json(savedCertificationRequest);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/certification-requests/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userCertifications = await CertificationRequest.find({ studentId: userId });
        res.json(userCertifications);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/************************************ History ************************************/

// Getting all the declarations user has made from the database

app.get('/api/declarations/:userId', async (req, res) => {

    try {
        const { userId } = req.params;
        const declarations = await Declaration.find({ user: userId }).populate('courses');
        res.json(declarations);
    } catch (error) {
        console.error('Error fetching declarations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/************************************ Professor ************************************/

app.get('/courses/professor/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const courses = await Course.find({ professors: userId });
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/students/declared/course/:course', async (req, res) => {
    try {
        const courseId = req.params.course;

        const course = await Course.findById(courseId);

        // Find the current academic year
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const lastYear = currentYear - 1;
        const nextYear = currentYear + 1;
        const academicYear = `${currentYear}-${nextYear}`;
        const academicYear2 = `${lastYear}-${currentYear}`;

        // Find the latest exam season for the current academic year
        const latestExam = await ExamsSeason.findOne({
            $or: [
                { year: { $regex: academicYear, $options: 'i' } },
                { year: { $regex: academicYear2, $options: 'i' } }
            ],
            endData: { $gte: currentDate },
        }).sort({ endData: -1 });

        if (!latestExam) {
            console.log(`No upcoming exams for the academic years ${academicYear} or ${academicYear2}`);
        }

        // Find student declarations for the course and latest exam
        const studentsDeclarations = await Declaration.find({ courses: course._id, exam: latestExam._id }).populate('user');

        if (studentsDeclarations.length > 0) {
            const students = studentsDeclarations.map(declaration => declaration.user);
            
            const grades = await Grade.find({
                course: course._id,
                student: { $in: students },
                exam: latestExam._id,
            });
        
            // Create an object with studentId as keys and corresponding grades as values
            const studentGradesMap = {};
            grades.forEach(grade => {
                studentGradesMap[grade.student.toString()] = grade;
            });
        
            const result = students.map(student => {
                const gradeInfo = studentGradesMap[student._id.toString()] || null;
                const status = gradeInfo ? gradeInfo.status : null;

                return {
                    student,
                    grade: gradeInfo,
                    status,
                };
            });
        
            res.json(result);
        } else {
            console.log(`No student declarations found for the course ${course.title}`);
            res.json([]);
        }

    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save-grades/:status/:courseId', verifyJWTuser, async (req, res) => {
    try {
        const { courseId, status } = req.params;  // Fix the destructuring here
        const gradesData = req.body.grades;

        const latestExamSeason = await ExamsSeason.findOne({}).sort({ endData: -1 });

        if (!latestExamSeason) {
            return res.status(404).json({ error: 'No exam season found' });
        }

        const gradeSaves = gradesData.map(async (grade) => {
            try {
                const student = await User.findOne({ username: grade.studentId });

                if (!student) {
                    console.error(`User with username ${grade.studentId} not found`);
                    return;
                }

                // Find and delete existing grade for the student, exam, and course
                await Grade.findOneAndDelete({ exam: latestExamSeason._id, course: courseId, student: student._id });

                // Save
                await new Grade({
                    student: student._id,
                    course: courseId,
                    grade: grade.grade,
                    status: status,
                    exam: latestExamSeason._id
                }).save();

            } catch (error) {
                console.error('Error processing grade:', error);
            }
        });

        await Promise.all(gradeSaves);
        res.status(200).json({ message: 'Grades saved successfully' });
    } catch (error) {
        console.error('Error saving grades:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/************************************** DATA ****************************************************/

// Inserting data to our database - test users and courses.
// All Users have the same password "pass123"

app.get('/data', async (req, res) => {
    try {
        // const student1 = new User({
        //     first_name: 'Δημήτρης',
        //     last_name: 'Αντωνίου',
        //     username: 'sdi2400001',
        //     email: 'sdi2400001@example.com',
        //     university: 'Πληροφορικής και Τηλεπικοινωνιών',
        //     password: bcrypt.hashSync('pass123', bcryptSalt),
        //     role: 'student',
        //     am: 'sdi2400001',
        //     father: 'Αντώνης',
        //     mother: 'Αντωνία',
        //     birth_date: '23/06/2006',
        //     family: 'Άγαμος',
        //     siblings: 0,
        //     army: 'Όχι',
        //     birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
        //     ID: 'AK336699',
        //     ID_location: 'Κερατσινίου',
        //     AMKA: 23060622553,
        //     home: 'Αιόλου 45',
        //     city: 'Αθήνα',
        //     phone: 6977553311,
        //     postal: 55443,
        //     temp_home: '-',
        //     temp_city: '-',
        //     temp_phone: '-',
        //     postal_temp: '-',
        // });

        // const student2 = new User({
        //     first_name: 'Ορέστης',
        //     last_name: 'Πίνας',
        //     username: 'sdi2000122',
        //     email: 'sdi2000122@example.com',
        //     university: 'Πληροφορικής και Τηλεπικοινωνιών',
        //     password: bcrypt.hashSync('pass123', bcryptSalt),
        //     role: 'student',
        //     am: 'sdi2000122',
        //     father: 'Γιάννης',
        //     mother: 'Φωτεινή',
        //     birth_date: '11/09/2002',
        //     family: 'Άγαμος',
        //     siblings: 2,
        //     army: 'Όχι',
        //     birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
        //     ID: 'AI456773',
        //     ID_location: 'Αθηνών',
        //     AMKA: 11090211559,
        //     home: 'Αθήνας 44',
        //     city: 'Αθήνας',
        //     phone: 6911223344,
        //     postal: 11111,
        //     temp_home: '-',
        //     temp_city: '-',
        //     temp_phone: '-',
        //     postal_temp: '-',
        // });

        // const student3 = new User({
        //     first_name: 'Βασιλική',
        //     last_name: 'Ευσταθίου',
        //     username: 'sdi2400012',
        //     email: 'sdi2400012@example.com',
        //     university: 'Πληροφορικής και Τηλεπικοινωνιών',
        //     password: bcrypt.hashSync('pass123', bcryptSalt),
        //     role: 'student',
        //     am: 'sdi2400012',
        //     father: 'Μάρκος',
        //     mother: 'Νίκη',
        //     birth_date: '22/12/2006',
        //     family: 'Άγαμη',
        //     siblings: 1,
        //     army: 'Όχι',
        //     birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
        //     ID: 'AK456456',
        //     ID_location: 'Πειραιά',
        //     AMKA: 22120623355,
        //     home: 'Αιόλου 45',
        //     city: 'Αθήνα',
        //     phone: 6988774411,
        //     postal: 12345,
        //     temp_home: '-',
        //     temp_city: '-',
        //     temp_phone: '-',
        //     postal_temp: '-',
        // });

        // const student4 = new User({
        //     first_name: 'Μαρία',
        //     last_name: 'Δημητρίου',
        //     username: 'sdi2400222',
        //     email: 'sdi2400222@example.com',
        //     university: 'Πληροφορικής και Τηλεπικοινωνιών',
        //     password: bcrypt.hashSync('pass123', bcryptSalt),
        //     role: 'student',
        //     am: 'sdi2400222',
        //     father: 'Φώτης',
        //     mother: 'Άννα',
        //     birth_date: '12/05/2006',
        //     family: 'Άγαμη',
        //     siblings: 1,
        //     army: 'Όχι',
        //     birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
        //     ID: 'AK123123',
        //     ID_location: 'Ηλιούπολης',
        //     AMKA: 12050622222,
        //     home: 'Δυδίτου 3',
        //     city: 'Ηλιούπολη',
        //     phone: 6912312312,
        //     postal: 32154,
        //     temp_home: '-',
        //     temp_city: '-',
        //     temp_phone: '-',
        //     postal_temp: '-',
        // });

        // const student5 = new User({
        //     first_name: 'Γιάννης',
        //     last_name: 'Κόλιας',
        //     username: 'sdi1500012',
        //     email: 'sdi1500012@example.com',
        //     university: 'Πληροφορικής και Τηλεπικοινωνιών',
        //     password: bcrypt.hashSync('pass123', bcryptSalt),
        //     role: 'student',
        //     am: 'sdi1500012',
        //     father: 'Βασίλης',
        //     mother: 'Κατερίνα',
        //     birth_date: '23/12/1997',
        //     family: 'Άγαμος',
        //     siblings: 1,
        //     army: 'Ναί',
        //     birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
        //     ID: 'AK789789',
        //     ID_location: 'Ελληνικό',
        //     AMKA: 23129789977,
        //     home: 'Άπρας 5',
        //     city: 'Ελληνικό',
        //     phone: 6978978978,
        //     postal: 45677,
        //     temp_home: '-',
        //     temp_city: '-',
        //     temp_phone: '-',
        //     postal_temp: '-',
        // });

        // const student6 = new User({
        //     first_name: 'Άννα',
        //     last_name: 'Αρτεμίου',
        //     username: 'sdi1900125',
        //     email: 'sdi1900125@example.com',
        //     university: 'Πληροφορικής και Τηλεπικοινωνιών',
        //     password: bcrypt.hashSync('pass123', bcryptSalt),
        //     role: 'student',
        //     am: 'sdi1900125',
        //     father: 'Βασίλης',
        //     mother: 'Ελένη',
        //     birth_date: 23 / 1 / 2001,
        //     family: 'Άγαμη',
        //     siblings: 1,
        //     army: 'Ναί',
        //     birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
        //     ID: 'AK789789',
        //     ID_location: 'Μαρούσι',
        //     AMKA: 23010111111,
        //     home: 'Μαρουσίου 5',
        //     city: 'Μαρούσι',
        //     phone: 6945632232,
        //     postal: 45655,
        //     temp_home: '-',
        //     temp_city: '-',
        //     temp_phone: '-',
        //     postal_temp: '-',
        // });

        const professor2 = new User({
            first_name: 'Ιωάννα',
            last_name: 'Οικονόμου',
            username: 'ioikonomou',
            email: 'ioikonomou@example.com',
            university: 'Πληροφορικής και Τηλεπικοινωνιών',
            password: bcrypt.hashSync('pass123', bcryptSalt),
            role: 'professor',
            am: 22252007123,
            father: 'Γιώργος',
            mother: 'Μαρία',
            birth_date: '11/12/1975',
            family: 'married',
            siblings: '',
            army: '',
            birth_location: 'ΑΘΗΝΩΝ ΑΤΤΙΚΗΣ',
            ID: 'AM928472',
            ID_location: 'Ηλιούπολης',
            AMKA: 11121975621,
            home: 'Φίφης 2',
            city: 'Αθήνα',
            phone: 6911223344,
            postal: 12345,
            temp_home: '',
            temp_city: '',
            temp_phone: '',
            postal_temp: '',
        });

        const major1 = new Course({
            title: 'Γραμμική Άλγεβρα',
            id_course: 'Y01',
            ects: 6,
            semester: 1,
            professors: professor._id,
            books: ['Γραμμική Άλγεβρα 1', 'Γραμμική Άλγεβρα 2'],
            hours: 40,
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

        const major2 = new Course({
            title: 'Εισαγωγή στον Προγραμματισμό',
            id_course: 'Y02',
            ects: 7,
            semester: 1,
            professors: professor._id,
            books: ['Εισαγωγή 1', 'Εισαγωγή 2'],
            hours: 48,
            mandatory: true,
            lab: false,
            general: false,
            direction: '',
            major: '',
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
            professors: professor._id,
            books: ['Ανάλυση 1', 'Ανάλυση 2'],
            hours: 48,
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

        const major4 = new Course({
            title: 'Δομές Δεδομένων και Τεχνικές Προγραμματισμού',
            id_course: 'Y04',
            ects: 7,
            semester: 2,
            professors: professor._id,
            books: ['Δομές 1', 'Δομές 2'],
            hours: 50,
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

        const major5 = new Course({
            title: 'Αντικειμενοστραφής Προγραμματισμός',
            id_course: 'Y05',
            ects: 8,
            semester: 3,
            professors: professor._id,
            books: ['Αντικειμενοστραφής 1', 'Αντικειμενοστραφής 2'],
            hours: 60,
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

        const major6 = new Course({
            title: 'Πιθανότητες και Στατιστική ',
            id_course: 'Y06',
            ects: 6,
            semester: 3,
            professors: professor._id,
            books: ['Πιθανότητες 1', 'Πιθανότητες 2'],
            hours: 48,
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

        const major7 = new Course({
            title: 'Αλγόριθμοι και Πολυπλοκότητα',
            id_course: 'Y07',
            ects: 8,
            semester: 4,
            professors: professor._id,
            books: ['Αλγόριθμοι 1', 'Αλγόριθμοι 2'],
            hours: 48,
            mandatory: true,
            lab: false,
            general: false,
            direction: '',
            major: '',
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
            professors: professor._id,
            books: ['Βάσεις 1', 'Βάσεις 2'],
            hours: 56,
            mandatory: true,
            lab: false,
            general: false,
            direction: '',
            major: '',
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
            professors: professor._id,
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
            professors: professor._id,
            books: ['Τεχνικές 1', 'Τεχνικές 2'],
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

        const choice3 = new Course({
            title: 'Επικοινωνία Ανθρώπου Μηχανής',
            id_course: 'E03',
            ects: 6,
            semester: 7,
            professors: professor2._id,
            books: ['Επικοινωνία 1', 'Επικοινωνία 2'],
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

        const choice4 = new Course({
            title: 'Καινοτομία και Επιχειρηματικότητα ',
            id_course: 'E04',
            ects: 4,
            semester: 8,
            professors: professor2._id,
            books: ['Καινοτομία 1', 'Καινοτομία 2'],
            hours: 40,
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

        const lab1 = new Course({
            title: 'Εργαστήριο Λογικής Σχεδίασης',
            id_course: 'EP01',
            ects: 2,
            semester: 1,
            professors: professor2._id,
            books: ['Εργαστήριο 1', 'Εργαστήριο 2'],
            hours: 40,
            mandatory: false,
            lab: true,
            general: false,
            direction: '',
            major: '',
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
            mandatory: false,
            lab: true,
            general: false,
            direction: '',
            major: '',
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
            mandatory: false,
            lab: true,
            general: false,
            direction: '',
            major: '',
            project: false,
            departmental_selection: false,
            internship: false,
            thesis: false,
        });

        // Save to the database
        Promise.all(
            [
                student1.save(), student2.save(), student3.save(), student4.save(), student5.save(), student6.save(), professor.save(),
                professor2.save(),
                major2.save(), major3.save(), major4.save(), major5.save(), major6.save(), major7.save(), major8.save(),
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

app.get('/exams', async (req, res) => {
    try {
        const exam1 = new ExamsSeason({
            endData: new Date('12/12/2023'),
            examsSeason: 'Winter',
            year: '2023-2024',
            open: false
        });
        // Save to the database
        Promise.all(
            [exam1.save()])
            .then(() => {
                console.log('Exams created successfully');
            })
            .catch((error) => {
                console.error('Error creating exams:', error);
            });

        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error.message);
    }
});