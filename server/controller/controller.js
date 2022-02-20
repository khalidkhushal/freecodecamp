const bcrypt = require('bcrypt');
const express = require('express');
const userdata = require('../model/model');
const jwt = require('jsonwebtoken');



const maxAge = 1000 * 60 * 60 * 24 * 3;
const createtoken = (id) => {
    const token = jwt.sign({ id }, 'this is secret');
    return token;
}

// handling errors
const handleerror = (err) => {
    console.log(err.message, err.code);
    const errors = { name: "", email: "", password: "", gender: "" };
    if (err.message.includes('userdata validation failed')) {
        Object.values(err.errors).forEach(error => {
            errors[error.properties.path] = error.properties.message;
            return errors;
        })
    }
    if (err.code == 11000) {
        errors.email = 'this email is already registered';
        return errors.email;
    }
    return { errors };

}

// adding new user
exports.add_user = async(req, res, next) => {
    const { name, email, password, gender } = req.body;
    if (!req.body) {
        return res.send('new user cant be added without data');
    }


    const user = new userdata({
        name: name,
        email: email,
        password: password,
        gender: gender
    });
    user
        .save(user)
        .then(() => {
            const token = createtoken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
            res.status(201).redirect('/');
            next();
        }).catch(err => {

            const error = handleerror(err);
            res.status(400).json({ error });
        });

}

// logging in the user

exports.start_session = async(req, res) => {

    const { email, password } = req.body;
    const user = await userdata.findOne({ email });

    if (!user) { return res.status(400).send('Email is wrong') };

    const passcorrect = await bcrypt.compare(password, user.password);
    if (!passcorrect) { return res.status(400).send('password does not match') };

    res.cookie('jwt', createtoken(user._id), { httpOnly: true, maxAge: maxAge })
    res.redirect('/dashboard');
};