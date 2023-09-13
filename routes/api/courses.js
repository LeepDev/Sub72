// routes/api/users.js

const express = require('express')
const router = express.Router()
const cCtrl = require('../../controllers/api/courses')

// All paths start with '/api/courses'

router.post('/', cCtrl.create)
router.post('/delete/:id', cCtrl.deleteOne)
router.get('/', cCtrl.index)
router.get('/:id', cCtrl.findOne)

module.exports = router