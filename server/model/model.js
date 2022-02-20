const mongoose = require('mongoose')
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: {

        type: String,
        required: [true, 'please enter a name'],
        minlength: [6, 'name must be at least 6 characters long']
    },
    email: {
        type: String,
        required: [true, 'please enter an email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter an email address'],
        minlength: [6, 'passsword must be at least 6 characters long']
    },
    gender: {
        type: String,
        required: [true, 'please select gender']
    }
});



schema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
const userdata = new mongoose.model('userdata', schema);
module.exports = userdata;