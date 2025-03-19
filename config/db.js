const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'note',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
}).promise(); // Utilisation correcte des promesses

module.exports = pool;
