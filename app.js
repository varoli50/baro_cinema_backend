const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials:true
}))

const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

const movieRoutes = require('./routes/movieRoutes')
app.use('/movies', movieRoutes)
//app.use('/api/movie-images', movieRoutes)


module.exports = app
