const express = require('express');
const { PORT } = require('./config');
const path = require('path');
var bodyParser = require('body-parser');

const app = express();

// Middleware

app.engine('.html', require('ejs').__express);

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'html');

// Routes

app.use('/', require('./routes'));

app.listen(PORT, () => {
  console.log(`listening server from http://localhost:${PORT}`);
});
