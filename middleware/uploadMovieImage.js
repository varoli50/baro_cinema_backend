const multer =  require('multer')
const fs = require('fs')
const path = require('path')


//max fájl méret
const MAX_FILE_SIZE = 1024*1024*10



//hova milyen fájlnévvel mentem el a képet
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { movieID } = req.params;

        if (!movieID) {
            return cb(new Error('Hiányzik a film azonosító!'), null);
        }

        const uploadDir = path.join(process.cwd(), 'uploads', String(movieID));

        try {
            fs.mkdirSync(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } catch (err) {
            return cb(new Error('Nem sikerült létrehozni a mappát'), null);
        }
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,

    limits:{fileSize:MAX_FILE_SIZE},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|gif|svg|webp|avif|bmp|tiff/;
    
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
    
        if (extName && mimeType) {
            return cb(null, true);
        }
    
        return cb(new Error('Csak képformátumok megengedettek'), null);
    }
})


module.exports = {upload}