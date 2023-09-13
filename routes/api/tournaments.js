// routes/api/users.js

const express = require('express')
const router = express.Router()
const tCtrl = require('../../controllers/api/tournaments')

// All paths start with '/api/tournaments'

router.post('/', tCtrl.create)
router.post('/delete/:id', tCtrl.deleteOne)
router.post('/addUser/:id', tCtrl.addUser)
router.post('/removeUser/:id', tCtrl.removeUser)
router.post('/addCourse/:id', tCtrl.addCourse)
router.post('/removeCourse/:id', tCtrl.removeCourse)
router.get('/:id', tCtrl.findOne)
router.get('/', tCtrl.index)

module.exports = router