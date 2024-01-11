const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeclarationsSchema = new Schema({
    courses: [String],
    data: Date,
    examinationSemester: Number,
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    exam: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ExamsSeason'},
    // Add more 
});

const Declaration = mongoose.model('Declaration', DeclarationsSchema);

module.exports = Declaration;