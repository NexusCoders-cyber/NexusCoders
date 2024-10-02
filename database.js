const sqlite3 = require('sqlite3').verbose();
const config = require('./config');

const db = new sqlite3.Database(config.dbPath);

db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    lastCommand TEXT,
    commandCount INTEGER,
    lastCommandTime INTEGER
)`);

function getUser(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function updateUser(id, lastCommand, commandCount, lastCommandTime) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT OR REPLACE INTO users (id, lastCommand, commandCount, lastCommandTime)
                VALUES (?, ?, ?, ?)`,
            [id, lastCommand, commandCount, lastCommandTime],
            (err) => {
                if (err) reject(err);
                else resolve();
            }
        );
    });
}

function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function clearUserData(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports = { getUser, updateUser, getAllUsers, clearUserData };
