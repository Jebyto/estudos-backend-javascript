let playlists = [];

module.exports = {
    // GET /api/playlists
    index(req, res) {
        res.status(200).json(playlists);
    },
    //GET /api/playlists/:id
    show(req, res) {
        const { id } = req.params;
        const playlist = playlists.find(playlist => playlist.id === +id);

        if(!playlist){
            res.status(404).json({ message: "Playlist not found!"});
            return;
        }
        res.status(200).json(playlist);
    },
    //POST /api/playlists
    create(req, res) {
        const { name,  tags, musics} = req.body;

        if(typeof name!=='string'){
            res.status(400).json({ message: "Invalid name!"});
            return;
        }

        if(!Array.isArray(tags)){
            res.status(400).json({ message: "Tags must be an array!"});
            return;
        }

        const newPlaylist = {
            id: Math.floor(Math.random() * 1000),
            name: name,
            tags: tags,
            musics: musics ?? [],
        }

        playlists.push(newPlaylist);
        res.status(201).json(newPlaylist);
    },

    //PUT /api/playlists/:id
    update(req, res) {
        const { id } = req.params;
        const { name,  tags } = req.body;

        const playlist = playlists.find(playlist => playlist.id === +id);

        if(!playlist){
            res.status(404).json({ message: "Playlist not found!"});
            return;
        }

        if(typeof name ==='string'){
            playlist.name = name;
        }

        if(tags && Array.isArray(tags)){
            playlist.tags = tags;
        }

        res.status(200).json(playlist);
    },

    //DELETE /api/playlists/:id
    delete(req, res) {
        const { id } = req.params;

        const index = playlists.findIndex(playlist => playlist.id === +id);

        if(index === -1){
            res.status(404).json({ message: "Playlist not found!"});
            return;
        }

        playlists.splice(index, 1);
        res.status(204).send();
    },
    //POST /api/playlists/:id/musics
    addMusic(req, res) {
        const { title, year, artist, album } = req.body;
        const { id } = req.params;

        const playlist = playlists.find(playlist => playlist.id === +id);

        if(!playlist){
            res.status(404).json({ message: "Playlist not found!"});
            return;
        }
        
        if(typeof title!=='string' || typeof year!== 'number' || typeof artist!=='string' || typeof album!=='string'){
            res.status(400).json({ message: "Invalid music data!"});
            return;
        }

        const newMusic = {
            id: Math.floor(Math.random() * 1000),
            title: title,
            year: year,
            artist: artist,
            album: album,
        }

        playlist.musics.push(newMusic);
        res.status(201).json(newMusic);
    },
    //DELETE /api/playlists/:playListId/musics/:musicId
    removeMusic(req, res) {
        const { playlistId, musicId } = req.params;

        const playlist = playlists.find(playlist => playlist.id === +playlistId);

        if(!playlist){
            res.status(404).json({ message: "Playlist not found!"});
            return;
        }

        const index = playlist.musics.findIndex(music => music.id === +musicId);

        playlist.musics.splice(index, 1);

        res.status(200).json({message: "Music removed!"});
    }
}