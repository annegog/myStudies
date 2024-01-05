const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
    title: String,
    id_course: {type:String, unique:true},
    ects: Number,
    semester: Number,
    professors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    books: [String],
    hours: Number,
    mandatory: Boolean,
    lab: Boolean,
    general: Boolean,
    direction: { type: String, enum: ['A', 'B', ''] },
    major: { type: String, enum: ['1', '2','3', ''] },
    project: Boolean,
    departmental_selection: Boolean,
    internship: Boolean,
    thesis: Boolean,
  // Add more fields as needed
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;