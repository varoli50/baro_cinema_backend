const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findByEmail, createUser} =require('../models/userModels')
const {config} = require('../config/dotenvConfig')


const cookieOpts = {
    httpOnly:  true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000*60*60*24*4
}

async function register(req,res) {
    try {
        const {username,email,psw } = req.body
       //console.log(email,username,psw);
    
       if (!username || !email || !psw) {
        return res.status(400).json({error: 'Nem lehet üres adatokat tartalmazó mező!'})
    }

    const exists = await findByEmail(email)
    //console.log(exists);
    if (exists) {
        return res.status(409).json({error:'Ez a felhasználó már létezik!'})
    }

    const hash = await bcrypt.hash(psw,10)
    //console.log(hash)
    const {insertId} = await createUser(username,email,hash)
    //console.log(insertId);
    return res.status(201).json({message:'Sikeres regisztráció!', insertId})
    } catch (err) {
        return res.status(500).json({error: 'Regisztrációs hiba', err})
    }
}
async function login(req,res) {
    try {
        const {email,psw} = req.body
        //console.log(email,psw);
        if (!email || !psw) {
            return res.status(400).json({error: 'Email és jelszó kötelező'})
        }

        const exists = await findByEmail(email)
        //console.log(exists);
        if (!exists) {
            return res.status(400).json({error:'Hibás email'})
        }

        const ok = await bcrypt.compare(psw,exists.psw)
        //console.log(ok);

        if (!ok) {
            return res.status(401).json({ error:'Hibás jelszó'})
        }

        const token = jwt.sign(
            {user_id: exists.user_id, email: exists.email, username: exists.username, role: exists.role},
            config.JWT_SECRET,
           {expiresIn: config.JWT_EXPIRES_IN}
        )
        //console.log(token);

        res.cookie(config.COOKIE_NAME,token,cookieOpts)
        return res.status(200).json({message: 'Sikeres login'})

    } catch (err) {
        return res.status(500).json({error: 'Belépési hiba!', err: err})
    }   
}

module.exports ={register,login}