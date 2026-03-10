const db = require('../database/database')

async function findByEmail(email) {
    const sql = 'SELECT * FROM user WHERE email = ?'
    const [result] = await db.query(sql,[email])
    return result[0] || null
}

async function createUser(userId,lastname,firstname,email,psw,hash) {
    const sql = 'INSERT INTO `user` (`userId`, `lastname`,`firstname`, `email`, `psw`, `role`) VALUES (NULL, ?, ?,?, ?,"user")'
    const [result]  = await db.query(sql,[userId,lastname,firstname,email,psw,hash])
    console.log(result);
    return {insertId: result.insertId }
}

module.exports = {findByEmail,createUser}
