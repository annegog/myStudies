const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeclarationsSchema = new Schema({
    courses: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' }],
    data: Date,
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    exam: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ExamsSeason'},
});

const Declaration = mongoose.model('Declaration', DeclarationsSchema);

module.exports = Declaration;