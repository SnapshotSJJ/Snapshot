const mysql = require('mysql');

var user = 'root';
var password = '';
var db = 'instagram';

var connection = mysql.createConnection({

  host: 'localhost',
  user: user,
  password: password,
  database: db

});

connection.connect(function(err) {
  if(err) {
    return console.log('There was an error: ', err)
  };
  console.log('Now connected to ', db);
});