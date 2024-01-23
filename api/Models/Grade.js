const mongoose = require('mongoose');
const { Schema } = mongoose;

const GradeSchema = new Schema({
    course: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    exam: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ExamsSeason'},
});

const Grade = mongoose.model('Grade', GradeSchema);

module.exports = Grade;