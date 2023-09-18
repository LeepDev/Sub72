const Tournament = require('../../models/tournament')

module.exports = {
    create,
    index,
    deleteOne,
    findOne,
    addUser,
    removeUser,
    addCourse,
    removeCourse,
    update
}

async function create(req, res) {
    try {
        const tournament = await Tournament.create(req.body)
        res.json(tournament)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function update(req, res) {
    try {
        const tournament = await Tournament.findById(req.params.id).populate('users').populate('courses')
        console.log(req.body)
        tournament.name = req.body.name
        tournament.rounds = req.body.rounds
        if (req.body.live)
            tournament.live = true
        else
            tournament.live = false
        await tournament.save()
        res.json(tournament)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function deleteOne(req, res) {
    try {
        const tournament = await Tournament.deleteOne({_id: req.params.id})
        res.json(tournament)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function index(req, res) {
    try {
        const tournaments = await Tournament.find({}).populate('users').populate('courses')
        res.json(tournaments)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function findOne(req, res) {
    try {
        const tournament = await Tournament.findById(req.params.id).populate('users').populate('courses')
        res.json(tournament)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function addUser(req, res) {
    try {
        const t = await Tournament.findByIdAndUpdate(req.params.id, { $push: { users: req.body.id }}, { new: true}).populate('users').populate('courses')
        res.json(t)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function removeUser(req, res) {
    try {
        const t = await Tournament.findByIdAndUpdate(req.params.id, { $pull: { users: req.body.id }}, { new: true}).populate('users').populate('courses')
        res.json(t)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function addCourse(req, res) {
    try {
        const t = await Tournament.findByIdAndUpdate(req.params.id, { $push: { courses: req.body.id }}, { new: true}).populate('users').populate('courses')
        res.json(t)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function removeCourse(req, res) {
    try {
        const t = await Tournament.findByIdAndUpdate(req.params.id, { $pull: { courses: req.body.id }}, { new: true}).populate('users').populate('courses')
        res.json(t)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}