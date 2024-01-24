const mongoose = require('mongoose');
const { Schema } = mongoose;

const GradeSchema = new Schema({
    course: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ExamsSeason' },
    grade: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Grade = mongoose.model('Grade', GradeSchema);

module.exports = Grade;