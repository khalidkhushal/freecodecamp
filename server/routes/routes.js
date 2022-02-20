const express = require('express');
var route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');
var { isAuth, checkuser } = require('./authentication');

//defining routes
route.get('*', checkuser)
route.get('/', services.homeroute)
route.get('/sign_up', services.create_new)
route.get('/dashboard', isAuth, services.get_dashboard)
route.get('/logout', services.log_out)

//routes controller
route.post('/api/register', controller.add_user);
route.post('/api/login', controller.start_session);

//exporting routes
module.exports = route;