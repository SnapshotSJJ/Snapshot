const mysql = require('mysql');

var user = 'root';
var password = 'password';
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

/*

here is where we can use: 
connection.query('CREATE TABLE .....)
connection.query('INSERT INTO .....)
connection.query('SELECT * FROM .....)

or we can move that functionality into another controller if we want to be even more modular

*/