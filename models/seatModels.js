const database = require('../database/database')

async function getSeats() {
    const sql = 'SELECT * FROM `seats`'
    const [result] = await database.query(sql)
    return result || null
}

async function getSeatsByNumbers(seats) {
    const sql = 'SELECT * FROM seats WHERE seat_number IN (?)'
    const [result] = await database.query(sql, [seats])
    return result
}


async function pickedSeats(seats) {
    const sql = 'UPDATE seats SET picked = 1 WHERE seat_number IN (?)'
    const [result] = await database.query(sql,[seats])
    return result[0] || null
}

async function unpickSeats(seats) {
    const sql = 'UPDATE seats SET picked = 0 WHERE seat_number IN (?)'
    const [result] = await database.query(sql, [seats])
    return result
}

async function reservedSeats(seats) {
    const sql = ' UPDATE seats SET reserved = 1, picked = 0 WHERE seat_number IN (?)'
    const [result] = await database.query(sql,[seats])
    return result[0] || null
}

module.exports = {getSeats,getSeatsByNumbers,reservedSeats,pickedSeats,unpickSeats}