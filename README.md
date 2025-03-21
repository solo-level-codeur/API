# api-node
# API Express pour la Gestion des Notes

Cette API permet de gérer des notes avec des opérations CRUD (Create, Read, Update, Delete) basiques. Elle est construite avec Express.js et utilise une base de données MySQL.

## Installation

1. Clonez le dépôt :

    ```bash
    git clone https://github.com/votre-utilisateur/votre-depot.git
    cd votre-depot
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

## Configuration

Configurez votre base de données MySQL dans le fichier `config/db.js`.

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'votre-utilisateur',
    password: 'votre-mot-de-passe',
    database: 'votre-base-de-donnees',
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool;
