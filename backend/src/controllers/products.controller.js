const db = require('../config/db');

const getProducts = (req, res) => {
    const sql = 'SELECT * FROM productos';

    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({error: "Error al obtener productos"})
        }
        res.json(results)
    });
}

module.exports = { getProducts };