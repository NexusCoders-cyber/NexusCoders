const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users: [] }).write();

function getUser(userId) {
    return db.get('users').find({ id: userId }).value();
}

function updateUser(userId, lastCommand, commandCount, lastCommandTime) {
    const user = db.get('users').find({ id: userId });
    
    if (user.value()) {
        return user.assign({ lastCommand, commandCount, lastCommandTime }).write();
    } else {
        return db.get('users').push({ id: userId, lastCommand, commandCount, lastCommandTime }).write();
    }
}

module.exports = { getUser, updateUser };
