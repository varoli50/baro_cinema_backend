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

async function deleteMovie(movieId) {
    const sql = 'DELETE FROM movies WHERE `movies`.`movield` = ?'
    console.log(movieId);
    const [result] = await database.query(sql,[movieId])
    return result
}

async function getMovie() {
    
}

/*async function insertMovieImg(movieID, movieimg) {
    const sql = 'INSERT INTO `movieimage`(`movieID`, `movieimg`) VALUES (?,?)'
    const [result] = await db.query(sql, [movieID,movieimg])
    console.log(result); 
}*/


module.exports = {createMovie,findByTitle,deleteMovie}