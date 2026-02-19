const {config} = require('./config/dotenvConfig')
const app = require('./app')

const PORT = config.PORT
const HOST = config.HOST
const JWT_SECRET = config.JWT_SECRET

app.listen(PORT,HOST, ()=> {
    console.log(`Szerver IP: http://${HOST}:${PORT}`);
})