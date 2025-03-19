require('dotenv').config();
const mysql = require('mysql2');

// Utilisation des variables d'environnement définies sur Railway
const pool = mysql.createPool({
    host: process.env.MYSQLHOST,  // L'hôte MySQL depuis les variables d'environnement Railway
    user: process.env.MYSQLUSER,  // L'utilisateur MySQL
    password: process.env.MYSQLPASSWORD,  // Le mot de passe de l'utilisateur MySQL
    database: process.env.MYSQL_DATABASE,  // Nom de la base de données
    port: process.env.MYSQLPORT || 3306,  // Le port de la base de données (3306 est le port par défaut pour MySQL)
}).promise();  // Active l'utilisation des promesses avec async/await

module.exports = pool;
