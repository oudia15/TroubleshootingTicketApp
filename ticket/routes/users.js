const express = require('express');
const router = express.Router();

//Register
router.post('/register', (req, res) => {
  res.send('User Registration');
});

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

module.exports =  router;
