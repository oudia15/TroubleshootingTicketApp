const express = require('express');
const router = express.Router();


//get one
router.get('/:id', (req, res) => {
  res.send('get a single ticket');
});

//Create
router.post('/create', (req, res) => {
  res.send('Creating a ticket');
});

//Update
router.put('/:id', (req, res) => {
  res.send('Updating a ticket');
});

//delete
router.delete('/:id', (req, res) => {
  res.send('Deleting a ticket');
});

module.exports =  router;
