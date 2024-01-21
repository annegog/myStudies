const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamsSeasonSchema = new Schema({
    endData: Date,
    examsSeason:  { type: String, enum: ['Winter', 'Spring', 'Repeat'] },
    year: String
});

const ExamsSeason = mongoose.model('ExamsSeason', ExamsSeasonSchema);

module.exports = ExamsSeason;