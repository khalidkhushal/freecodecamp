const userdata = require('../model/model');
const jwt = require('jsonwebtoken');
var { isAuth, checkuser } = require('../routes/authentication');
//const passport = require('passport');


exports.homeroute = (req, res) => {
    res.render("index");
}
exports.create_new = (req, res) => {
    res.render('sign_up', { title: 'Sign Up' })
}
exports.get_dashboard = (req, res) => {
    res.render('dashboard', { title: 'Dashboard' })
}
exports.log_out = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}