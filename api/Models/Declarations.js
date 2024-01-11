const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeclarationsSchema = new Schema({
    courses: [String],
    data: Date,
    examinationSemester: Number,
    
    // Add more 
});

const Declaration = mongoose.model('Declaration', DeclarationsSchema);

module.exports = Declaration;