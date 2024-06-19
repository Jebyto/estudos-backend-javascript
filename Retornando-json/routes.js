const express = require('express')
const gamesController = require('./controllers/gameController')

const router = express.Router()

router.get('/', (req, res) => {
	res.json({ message: 'Hello, world!' })
})

router.get('/games', gamesController.index)
router.get('/games/:id', gamesController.show)

module.exports = router