const database = require('../database/database')

async function findByTitle(title) {
    const sql = 'SELECT * FROM `movies` WHERE title = ?'
    const [result] = await database.query(sql,[title])
    return result[0] || null
}

async function createMovie(movieId, title, genre, duration, language) {
    const sql = 'INSERT INTO `movies`(`movield`, `title`, `genre`, `duration`, `language`) VALUES (NULL, ?,?,?,? )'
    const [result] = await database.query(sql, [movieId, title, genre, duration, language])
    //console.log(result);
    return {insertId: result.insertId }
}

async function deleteMovie() {
    
}

async function getMovie() {
    
}

async function uploadMovieImg() {
    
}


module.exports = {createMovie,findByTitle}