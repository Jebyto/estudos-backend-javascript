const express = require('express')
const authController = require('../controllers/auth-controller')
const { ensureAuth } = require('../middlewares/auth-middleware')
const route = express.Router()

route.post('/register', authController.register)
route.post('/login', authController.login)

route.get('/test', ensureAuth, (req, res) => res.json({ message: 'ok' }))

module.exports = route