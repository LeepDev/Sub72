const Tournament = require('../../models/tournament')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    create,
    index,
}

async function create(req, res) {
    try {
        const tournament = await Tournament.create(req.body)
        res.json(tournament)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function index(req, res) {
    try {
        const tournaments = await Tournament.find({})
        res.json(tournaments)
    } catch (err) {
        res.status(400).json(err)
    }
}