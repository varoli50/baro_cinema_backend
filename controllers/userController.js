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
        const {lastname,firstname,email,psw } = req.body
        //console.log(lastname,firstname,email,psw);
    
       if (!lastname || !firstname || !email || !psw) {
        return res.status(400).json({error: 'Nem lehet üres adatokat tartalmazó mező!'})
    }

    const exists = await findByEmail(email)
    //console.log(exists);
    if (exists) {
        return res.status(409).json({error:'Ez a felhasználó már létezik!'})
    }

    const hash = await bcrypt.hash(psw,10)
    //console.log(hash)
    const {insertId} = await createUser(lastname,firstname,email,hash)
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
            {userId: exists.userId,lastname: exists.lastname, firstname: exists.firstname, email: exists.email, role: exists.role},
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
async function whoAmI(req,res) {
    try {
        const {userId,lastname,firstname,email,role} = req.user
        //console.log() 
        res.status(200).json({userId: userId,lastname: lastname, firstname: firstname, email: email, role: role})
    } catch (err) {
        return res.status(500).json({error: "whoAmI server oldali hiba"})
    }
}
async function logout(req,res) {
    try {
        return res.clearCookie(config.COOKIE_NAME, {path: '/'}).
        status(200).json({message:" Sikeres kijelentkezés"})
    } catch (err) {
        return res.status(500).json({error: "Logout server oldali hiba"})
    }
}

module.exports ={register,login, whoAmI,logout}