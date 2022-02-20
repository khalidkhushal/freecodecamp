// IMPORTING MODULES
const express = require('express');
const morgan = require('morgan')
const path = require('path')
const bodyparser = require('body-parser')
const connectdb = require('./server/database/connection')
const cookieParser = require('cookie-parser');
var { isAuth, checkuser } = require('./server/routes/authentication');
require('dotenv').config();
//require('./server/controller/auth');
//creating server
const app = express()
    // app.use(cookieparser);
    //
app.set('view engine', 'ejs')
    //app.use(morgan('tiny'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());


//static files or assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))
app.use('/images', express.static(path.resolve(__dirname, 'assets/images')))

// calling database connection file
connectdb();

//routes
app.use('/', require('./server/routes/routes'));

//server in listening mode
app.listen(process.env.PORT, () => {
    console.log('server is running at http://localhost:8080');
})