const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamsSeasonSchema = new Schema({
    endData: Date,
    examsSeason: { type: String, enum: ['Winter', 'Spring', 'Repeat'] },
    year: String,
    open: Boolean // if it's the current exam season
});

const ExamsSeason = mongoose.model('ExamsSeason', ExamsSeasonSchema);

module.exports = ExamsSeason;