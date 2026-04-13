const db = require('../database/database')

async function findByEmail(email) {
    const sql = 'SELECT * FROM user WHERE email = ?'
    const [result] = await db.query(sql,[email])
    return result[0] || null
}

async function createUser(lastname,firstname,email,hash) {
    
    const sql = 'INSERT INTO `user` (`userId`, `lastname`,`firstname`, `email`, `psw`, `role`) VALUES (NULL, ?, ?,?, ?,"user")'
    const [result]  = await db.query(sql,[lastname,firstname,email,hash])
    console.log(result);
    return {insertId: result.insertId }
}

// összes felhasználó lekérése
async function getAllUser() {
    const sql = 'SELECT userId, lastname, firstname, email, role FROM user'
    const [result] = await db.query(sql)

    return result
}

// felhasználó törlése id alapján
async function delUser(userId) {
    const sql = 'DELETE FROM user WHERE userId = ?'
    const [result] = await db.query(sql, [userId])

    return result
}

async function newPsw(email,psw) {
    const sql = 'UPDATE user SET psw = ? WHERE email = ?'
    const [result] = await db.execute(sql,[email,psw])
    return result
}


module.exports = {findByEmail,createUser,getAllUser,delUser,newPsw}
