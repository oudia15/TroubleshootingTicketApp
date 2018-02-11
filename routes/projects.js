const express = require('express');
const router = express.Router();


//Create
router.get('/', (req, res) => {
  res.send('get all projects');
});

//Create
router.get('/:id', (req, res) => {
  res.send('get a single project');
});

//Create
router.post('/create', (req, res) => {
  res.send('Creating a project');
});

//Update
router.put('/:id', (req, res) => {
  res.send('Updating a project');
});

//delete
router.delete('/:id', (req, res) => {
  res.send('Deleting a project');
});

module.exports =  router;
