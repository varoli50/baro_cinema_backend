const db = require('../database/database')

async function findByEmail(email) {
    const sql = 'SELECT * FROM user WHERE email = ?'
    const [result] = await db.query(sql,[email])
    return result[0] || null
}

async function createUser(username,email,hash) {
    const sql = 'INSERT INTO `user` (`userId`, `username`, `email`, `birthDate`, `psw`, `role`) VALUES (NULL, ?, ?,(CURRENT_TIMESTAMP),?,"user")'
    const [result]  = await db.query(sql,[username,email,hash])
    console.log(result);
    return {insertId: result.insertId }
}

module.exports = {findByEmail,createUser}
