const express = require('express');
const playlistsController = require('./controllers/playlists-controller');

const router = express.Router();

router.get('/', (req, res) => { res.json({ message: 'Welcome to the playlists API' }) });

router.get('/belisco', (req, res) => { res.status(418).json({ message: 'Welcome to the playlists API' }) });

router.get('/playlists', playlistsController.index);

router.get('/playlists/:id', playlistsController.show);

router.post('/playlists', playlistsController.create);

router.put('/playlists/:id', playlistsController.update);

router.delete('/playlists/:id', playlistsController.delete);

router.post('/playlists/:id/musics', playlistsController.addMusic);

router.delete('/playlists/:playlistId/musics/:musicId', playlistsController.removeMusic);

module.exports = router;