const jwt = require('jsonwebtoken');
const User = require('../model/model');

const isAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'this is secret', (err, decodedtoken) => {
            if (err) {

                res.redirect('/');

            } else {

                next();
            }
        });
    } else {
        res.redirect('/');
    }
}
const checkuser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'this is secret', async(err, decodedToken) => {

            if (err) {
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { isAuth, checkuser };