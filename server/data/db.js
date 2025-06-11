// server/db.js
require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client from pool', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release(); 
        if (err) {
            return console.error('Error executing test query', err.stack);
        }
        console.log('Database connected successfully using Pool!');
        console.log('Current database time:', result.rows[0].now);
    });
});

module.exports = pool;