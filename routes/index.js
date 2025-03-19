const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Vérifie bien le chemin

// Route pour récupérer les données de la table test
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM test'); // Correction du nom de la table
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

router.get('/note/:id',async  (req, res) => {
    const{id} = req.params;
    console.log(id)
    try{
        const [rows] = await db.query('SELECT * FROM test WHERE id = ?', [id]);
        if (rows.length === 0 ){
            return res.status(404).send('Aucune note ne correspond à cet ID');
        }
        res.status(200).json(rows[0]);
    }catch (err) {
        console.log('Erreur lors de la récupération des données:', err);
        res.status(500).send('Erreur lors de la récuperation des données')
    }
})

// Route pour insérer une nouvelle phrase dans la table test
router.post('/note', async (req, res) => {
    const { nom,text,tag } = req.body; // Extrait la phrase du corps de la requête
    if (!nom || !text || !tag) {
        return res.status(400).send('La phrase est requise');
    }
    try {
        // Insérer la phrase dans la table 'test'
        const [result] = await db.query('INSERT INTO test (nom,text,tag) VALUES (?,?,?)', [nom,text,tag]);

        res.status(201).json({
            message: 'Donnée insérée avec succès!',
            insertId: result
        });
    } catch (err) {
        console.error('Erreur lors de l\'insertion des fkefjiefji:', err);
        res.status(500).send('Erreur lors de l\'insertion des données');
    }
});

router.delete('/note/:id',async(req,res)=>{
    const{id} = req.body;
    if (!id) {
        return res.status(400).send('L\'ID est requis');
    }
    try {
        const [result] = await db.query('DELETE FROM test WHERE id =?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Aucune note ne correspond à cet ID');
        }
        res.status(200).json({
            message: 'Donnée supprimée avec succès!'
        });
    } catch (err) {
        console.error('Erreur lors de la suppression des données:', err);
        res.status(500).send('Erreur lors de la suppression des données');
    }
    
})

router.put('/note/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, text, tag } = req.body;

    console.log(req.body);

    // Vérifier que tous les champs requis sont présents
    if (!id || !nom || !text || !tag) {
        return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    try {
        // Requête SQL pour mettre à jour la note
        const [result] = await db.query(
            'UPDATE test SET nom = ?, text = ?, tag = ? WHERE id = ?',
            [nom, text, tag, id]
        );

        // Vérifier si la mise à jour a affecté une ligne
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aucune note ne correspond à cet ID' });
        }

        res.status(200).json({
            message: 'Donnée mise à jour avec succès!',
        });
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données:', err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour des données' });
    }
});

router.patch('/note/:id', async (req, res) => {
    let { id } = req.params;
    const { nom, text, tag } = req.body;

    console.log(req.body);

    // Vérifie si ID est bien un nombre
    id = parseInt(id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "L'ID doit être un nombre valide" });
    }

    // Vérifier s'il y a au moins un champ à mettre à jour
    if (!nom && !text && !tag) {
        return res.status(400).json({ error: 'Au moins un champ doit être fourni pour la mise à jour' });
    }

    try {
        let query = 'UPDATE test SET ';
        let values = [];

        // Construire dynamiquement la requête en fonction des champs fournis
        if (nom) {
            query += 'nom = ?, ';
            values.push(nom);
        }
        if (text) {
            query += 'text = ?, ';
            values.push(text);
        }
        if (tag) {
            query += 'tag = ?, ';
            values.push(tag);
        }

        // Supprimer la dernière virgule et ajouter la condition WHERE
        query = query.slice(0, -2) + ' WHERE id = ?';
        values.push(id);
        

        // Exécuter la requête SQL
        const [result] = await db.query(query, values);
        console.log(result);

        // Vérifier si une ligne a été mise à jour
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aucune note ne correspond à cet ID' });
        }

        res.status(200).json({
            message: 'Donnée mise à jour avec succès!',
        });
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données:', err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour des données' });
    }
});


module.exports = router;