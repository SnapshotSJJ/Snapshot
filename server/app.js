const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(routes);

module.exports = app;