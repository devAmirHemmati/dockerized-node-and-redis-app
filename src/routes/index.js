const express = require('express');
const { GetHomeController, PostHomeController } = require('./../controller');

const app = express.Router();

app.get('/', GetHomeController);

app.post('/', PostHomeController);

module.exports = app;
