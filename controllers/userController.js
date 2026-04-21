const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { findByEmail, createUser,delUser,getAllUser, newPsw} =require('../models/userModels')
const {config} = require('../config/dotenvConfig')


const cookieOpts = {
    httpOnly:  true,
    secure: true,
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
        console.log(email,psw);
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
        console.log(token);

        res.cookie(config.COOKIE_NAME,token,cookieOpts)
        return res.status(200).json({message: 'Sikeres login'})

    } catch (err) {
        console.log(err);
        
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

// összes user lekérése
async function allUsers(req, res) {
    try {
        const result = await getAllUser()

        return res.status(200).json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Összes user lekérése server oldali hiba'})
    }
}

// egy felhasználó törlése
async function deleteUser(req, res) {
    try {
        const { userId } = req.params
        console.log(userId)
        const result = await delUser(userId)
        
        return res.status(200).json({ message: 'Sikeres törlés' })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Felhasználó törlésekor server oldali hiba' })
    }
}

async function resetPassword(req, res) {
    try {

        const { oldPassword, newPassword } = req.body
        const email = req.user.email
         console.log(email);

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                error: "Minden mező kötelező"
            })
        }

        const user = await findByEmail(email)
        // console.log(user);
        // console.log(user.psw);
        // console.log(ok);
        const ok = await bcrypt.compare(oldPassword, user.psw)
        // console.log(config.JWT_SECRET);
        // console.log(oldPassword, user.psw);
        // console.log(ok);
        if (!ok) {
            return res.status(401).json({
                error: "Régi jelszó hibás"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await newPsw(email, hashedPassword)

        res.status(200).json({
            message: "Jelszó módosítva"
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: "Jelszó módosítás hiba"
        })

    }
}

module.exports ={register,login, whoAmI,logout,allUsers,deleteUser,resetPassword}