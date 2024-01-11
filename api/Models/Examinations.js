const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamsSeasonSchema = new Schema({
    data: Date,
    ExamsSeason: Number,
    
    // Add more 
});

const ExamsSeason = mongoose.model('ExamsSeason', ExamsSeasonSchema);

module.exports = ExamsSeason;