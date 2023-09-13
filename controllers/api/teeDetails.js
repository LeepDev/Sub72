const TeeDetail = require('../../models/teeDetail')

module.exports = {
    findByCourse
}

async function findByCourse(req, res) {
    try {
        const tees = await TeeDetail.find( { "course": req.params.id })
        console.log(tees)
        res.json(tees)
    } catch (err) {
        res.status(400).json(err)
    }
}