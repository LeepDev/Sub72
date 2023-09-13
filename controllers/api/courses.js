const Course = require('../../models/course')

module.exports = {
    create,
    index,
    deleteOne,
    findOne
}

async function create(req, res) {
    try {
        const course = await Course.create(req.body)
        res.json(course)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deleteOne(req, res) {
    try {
        const course = await Course.deleteOne({_id: req.params.id})
        res.json(course)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function index(req, res) {
    try {
        const courses = await Course.find({})
        res.json(courses)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function findOne(req, res) {
    try {
        const course = await Course.findById(req.params.id)
        res.json(course)
    } catch (err) {
        res.status(400).json(err)
    }
}