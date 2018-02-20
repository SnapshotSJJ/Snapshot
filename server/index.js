const express = require('express');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.listen(1337, () => {
  console.log('Hey! Listen!');
});