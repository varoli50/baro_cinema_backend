const {getSeatsByNumbers, pickSeats} = require('../models/seatModels')


async function seats(req,res) {
    try {
        const result = await getSeats()

        if (result.length === 0) {
            return res.status(404).json({
                error: "Nincs szék az adatbázisban!"
            })
        }

        return res.status(200).json(result)

    } catch (err) {
        return res.status(500).json({
            error: "Nem sikerült lekérni a székeket!"
        })
    }
}

async function picked(req,res) {
    try {
        const { seats } = req.body

        if (!seats || seats.length === 0) {
            return res.status(400).json({
                error: "Nincs kiválasztott szék!"
            })
        }

        const existingSeats = await getSeatsByNumbers(seats)

        const foglalt = existingSeats.some(s => s.reserved || s.picked)

        if (foglalt) {
            return res.status(400).json({
                error: "Néhány szék már foglalt vagy kiválasztott!"
            })
        }

        await pickSeats(seats)

        return res.status(200).json({
            message: "Szék/székek kiválasztva"
        })

    } catch (err) {
        return res.status(500).json({
            error: "Hiba történt a kiválasztás közben"
        })
    }
}

async function reserved(req,res) {
    try {
        const { seats } = req.body

        if (!seats || seats.length === 0) {
            return res.status(400).json({
                error: "Nincs kiválasztott szék!"
            })
        }

        const existingSeats = await getSeatsByNumbers(seats)

        const foglalt = existingSeats.some(s => s.reserved)

        if (foglalt) {
            return res.status(400).json({
                error: "Néhány szék már foglalt!"
            })
        }

        await reserveSeats(seats)

        return res.status(200).json({
            message: "Foglalás sikeres"
        })

    } catch (err) {
        return res.status(500).json({
            error: "Nem sikerült foglalni"
        })
    }
}

module.exports = {seats,picked,reserved}