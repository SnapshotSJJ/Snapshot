const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const parser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());
app.use(parser.json());
app.use(routes);

module.exports = app;