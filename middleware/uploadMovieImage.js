const multer = require('multer')
const path = require('path')
const fs = require('fs')

// max fájl méret
const MAX_FILE_SIZE = 1024 * 1024 * 10 // 10MB

// hova és milyen fájlnévvel mentem el a képet
const storage = multer.diskStorage({
    // melyik mappába mentsünk
    destination: "./uploads/",
    filename: (req, file, cb)=>{
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

// tényleges feltöltés
const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|gif|svg|webp|avif|bmp|tiff/
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
        console.log(`kiterjesztés teszt: ${extName}`)
        const mimeType = fileTypes.test(file.mimetype)
        console.log(`mime test: ${mimeType}`)

        if (extName && mimeType) {
            return cb(null, true)
        }
        return cb(new Error('Csak képformátumok megengedettek'), null)
    }
})

module.exports = { upload }