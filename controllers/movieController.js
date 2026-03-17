const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const database = require('../database/database')
const {createMovie, findByTitle,deleteMovie,getMovie} =require('../models/movieModels')

async function addMovie(req,res) {
    try {
        const {title,genre,duration,language } = req.body
        //console.log(title,genre,duration,language);
    
       if (!title || !genre || !duration || !language) {
        return res.status(400).json({error: 'Nem lehet üres adatokat tartalmazó mező!'})
    }

    const exists = await findByTitle(title)
    //console.log(exists);
    if (exists) {
        return res.status(409).json({error:'Ez a film már fent van az adatbázisban!'})
    }

    const {insertId} = await createMovie(title,genre,duration,language)
    //console.log(insertId);
    return res.status(201).json({message:'Sikeres filmfelvitel!', insertId})
    } catch (err) {
        //console.log(err);
        return res.status(500).json({error: 'Hiba a felvitelkor!', err})
    }
}


async function delMovie(req,res) {
    try {
        const {movieId} = req.params
        console.log(movieId)
        const result = await deleteMovie(movieId)
        
        
        if (result.affectedRows === 0) {
            return res.status(400).json({error: 'Ezt már törölted'})
        }
        return res.status(204).send()
    } catch (err) {
        console.log(err);
       

        return res.status(500).json({error: ' Hiba a törléskor'})
    }
}


async function getAllMovie(req,res) {
    try {
        const result = await getMovie()
        if (result.length === 0) {
            return res.status(404).json({error: 'Nem található film az adatbázisban!'})
        }
        return res.status(200).json(result)

    } catch (err) {
        res.status(500).json({error:'Nem sikerült lekérni a filmeket az adatbázisból!'})
    }
}

/*async function uploadMovieImg(req,res) {
    try {
        const { movieID}=req.params
        //console.log(userId,movieID);
        const img = `uploads/${movieID}/${req.file.filename}`
        //console.log(img);
        const result = await insertJuryImg(movieID,img)
        console.log(result);

        return res.status(201).json({message:'Sikeres feltöltés!'})
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({error:'Már feltöltötted ezt a képet!'})
        }
        return res.status(500).json({error:'Képfeltöltési hiba!'})
    }
}*/


module.exports = {addMovie,delMovie,getAllMovie}