const sqlite3 = require('sqlite3').verbose();
const config = require('./config');

const db = new sqlite3.Database(config.dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            lastCommand TEXT,
            commandCount INTEGER DEFAULT 0,
            lastCommandTime INTEGER
        )`);
    }
});

function getUser(userId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function updateUser(userId, lastCommand, commandCount, lastCommandTime) {
    return new Promise((resolve, reject) => {
        db.run('INSERT OR REPLACE INTO users (id, lastCommand, commandCount, lastCommandTime) VALUES (?, ?, ?, ?)',
            [userId, lastCommand, commandCount, lastCommandTime],
            (err) => {
                if (err) reject(err);
                else resolve();
            }
        );
    });
}

module.exports = { getUser, updateUser };
