//Imports
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./network/routes');
const {port} = require('./config');
const bodyParser =  require("body-parser");

//Setting
app.set('port', port || 5000);

//View settings
app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'ejs');

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
routes(app);


module.exports = app;