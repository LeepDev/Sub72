// routes/api/users.js

const express = require('express')
const router = express.Router()
const tCtrl = require('../../controllers/api/tournaments')

// All paths start with '/api/tournaments'

router.post('/', tCtrl.create)
router.post('/delete/:id', tCtrl.deleteOne)
router.get('/', tCtrl.index)

module.exports = router