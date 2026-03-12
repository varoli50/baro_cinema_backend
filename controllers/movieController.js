const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {createMovie, findByTitle} =require('../models/movieModels')

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

module.exports = {addMovie}