const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamsSeasonSchema = new Schema({
    endData: Date,
    examsSeason: Number,
    //
    // Add more 
});

const ExamsSeason = mongoose.model('ExamsSeason', ExamsSeasonSchema);

module.exports = ExamsSeason;