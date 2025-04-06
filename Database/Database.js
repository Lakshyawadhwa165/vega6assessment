const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog_app'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to DB!');
});

module.exports = connection;