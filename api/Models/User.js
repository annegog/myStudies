const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    username: {type:String, unique:true},
    phone: Number,
    email: String,
    password: String,
    role: { type: String, enum: ['student', 'professor'] },
    am: {type:Number, unique:true}
    //
});

const User = mongoose.model('User', UserSchema);

module.exports = User;