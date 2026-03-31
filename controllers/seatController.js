const {getSeatsByNumbers, getSeats, pickedSeats, unpickSeats, reservedSeats, deleteReservedSeats} = require('../models/seatModels')


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
       //console.log(err);
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
                error: "Ez a szék már foglalt vagy kiválasztott!"
            })
        }

        await pickedSeats(seats)

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

        await reservedSeats(seats)

        return res.status(200).json({
            message: "Foglalás sikeres"
        })

    } catch (err) {
        return res.status(500).json({
            error: "Nem sikerült foglalni"
        })
    }
}

async function cancel(req,res) {
    try {
        const {seat_id} = req.params
        console.log(seat_id)
        const result = await deleteReservedSeats(seat_id)
        
        
        if (result.affectedRows === 0) {
            return res.status(400).json({error: 'Ezt már törölted'})
        }
        return res.status(204).send()
    } catch (err) {
        console.log(err);
       
        return res.status(500).json({error: 'Hiba a törléskor'})
    }
}

module.exports = {seats,picked,reserved,cancel}
