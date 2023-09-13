// routes/api/users.js

const express = require('express')
const router = express.Router()
const Ctrl = require('../../controllers/api/teeDetails')

// All paths start with '/api/teeDetails'

router.get('/course/:id', Ctrl.findByCourse)

module.exports = router