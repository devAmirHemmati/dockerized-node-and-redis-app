const express = require('express');
const {
  GetHomeController,
  PostHomeController,
  DeleteHomeController,
} = require('./../controller');

const app = express.Router();

app.get('/', GetHomeController);

app.post('/', PostHomeController);

app.post('/delete', DeleteHomeController);

module.exports = app;
