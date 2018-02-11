const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const db = require('./config/db');
//helper Console.log
const log = require('./helpers/log');

//Connecting to mongoose database
mongoose.Promise = global.Promise;
mongoose.connect(db.uri);

mongoose.connection.on('connected', () => {
  log(`Connected to database : ${db.uri}`);
});

mongoose.connection.on('error', (error) => {
  log(`Error Connecting to database. Error : ${error}`);
});
//initialiazing express
const app = express();
//initialiazing port
const port = process.env.PORT || 3000;

//importing routes
const users = require('./routes/users');
const projects = require('./routes/projects');
const tickets = require('./routes/tickets');

//Morgan middleware
app.use(morgan('dev'));

//cors middleware
app.use(cors());

//Set static Profile
app.use(express.static(path.join(__dirname + 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//users routes
app.use('/users', users);

//projects routes
app.use('/projects', projects);

//tickets routes
app.use('/tickets', tickets);

//Index routes
app.get('/', (req, res) => {
  res.send("Home Page");
});


app.listen(port, () => {
  log(`Server running on localhost:${port}`)
});
