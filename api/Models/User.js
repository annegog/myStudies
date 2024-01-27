const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    university: { type: String, unique: true },
    password: String,
    phone: Number,
    role: { type: String, enum: ['student', 'professor'] },
    am: { type: Number, unique: true, default: null },
    ID: { type: String, unique: true },
    ID_location: String,
    AMKA: { type: Number, unique: true },
    father: String,
    mother: String,
    birth_date: Date,
    home: String,
    city: String,
    postal: String,
    birth_location: String,
    family: { type: String, enum: ['married', 'unmarried', 'divorced'] },
    siblings: Number,
    army: { type: String, enum: ['yes', 'no', ''] },
    temp_home: String,
    temp_city: String,
    temp_phone: String,
    postal_temp: String,
    ects: Number,
    s_courses: Number
});

const User = mongoose.model('User', UserSchema);

module.exports = User;