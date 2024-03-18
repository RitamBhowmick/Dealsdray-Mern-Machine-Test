const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }, 
    email: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password is required']
    }
});

const registeredUser = mongoose.model('registeredUser1', UserSchema);

module.exports = registeredUser;