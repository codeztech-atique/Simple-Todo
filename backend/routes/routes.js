const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());

// Authentication of user
const authentication = require('../authentication/auth');

// Middleware
const middleware = require('../middleware/validatingApi');

// Controller
const controllers = require('../controllers/ppCtrl');

// Sample API testing
app.get('/', (req, res) => {
  res.send({
     status:200,
     message:'App is working fine!'
  });
});

// get all url shorten
app.get('/todo/get-all', (req, res, next) => {
  controllers.getAllInformation(req, res);
});

// Create todos
app.post('/todo/create', [middleware.validateAPI], (req, res, next) => {
  controllers.todoSaveList(req, res);
});

// Delete Single todos
app.delete('/:id', [middleware.fetchSingleDataValidateAPI], (req, res, next) => {
  controllers.deleteOne(req, res);
});

// Fetch Single todos
app.get('/:id', [middleware.fetchSingleDataValidateAPI], (req, res, next) => {
  controllers.fetchOne(req, res);
});

// Fetch Single todos
app.put('/todo/update', (req, res, next) => {
  controllers.updateOne(req, res);
});

module.exports = app;