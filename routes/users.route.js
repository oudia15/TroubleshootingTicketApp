const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');

//helper Console.log
const log = require('../helpers/log');

//Register
router.post('/register', usersCtrl.register );

//authenticate
router.post('/authenticate', (req, res) => {
  res.send('Authenticate');
});

//profile(Returns all tickets assigned to User)
router.get('/:id', (req, res) => {
  res.send('Profile');
});

//Update users
router.put('/:id', (req, res) => {
  res.send('Updating User');
});

//delete User
router.delete('/:id', (req, res) => {
  res.send('Deleting User');
});

//Check email
router.get('/checkEmail/:email', usersCtrl.checkEmail);

//Check username
router.get('/checkUsername/:username', usersCtrl.checkUsername);


module.exports =  router;
