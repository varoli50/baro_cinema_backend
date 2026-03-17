const multer =  require('multer')
const fs = require('fs')
const path = require('path')


//max fájl méret
const MAX_FILE_SIZE = 1024*1024*10



//hova milyen fájlnévvel mentem el a képet
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        const {movieID} = req.params
        console.log(`movieID: ${movieID}`);

        if (!movieID) {
            return cb(new Error( 'Hiányzik a zsűri azonosító'),null)
        }

        const uploadDir = path.join(process.cwd(), 'uploads',String(movieID) )
        console.log(`A célmappa neve: ${uploadDir}`);

        try {
            fs.mkdirSync(uploadDir, {recursive: true})
            cb(null,uploadDir)
        } catch (err) {
            return cb(new Error('Nem sikerült létrehozni a mappát'),null)
        }
    }

})

const upload = multer({
    storage: storage,

    limits:{fileSize:MAX_FILE_SIZE},
    fileFilter:(req,file,cb)=>{
        const fileTypes = /jpg|jpeg|png|gif|svg|webp|avif|bpm|tifff/
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())

        console.log(`Kiterjesztés: ${extName}`);

        const mineType = fileTypes.test(file.mimetype)
        console.log(`Valóban kép-e: ${mineType}`);

        if (extName && mineType) {
            return cb(null,true)
        }

        return cb(new Error('Csak képformátumok megengedettek'),null)
    }
})


module.exports = {upload}