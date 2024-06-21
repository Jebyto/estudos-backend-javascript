const games = [
  { id: 1, name: 'Legend of Mana', genres: ['action-rpg'], year: 1999 },
  { id: 2, name: 'World of Warcraft', genres: ['mmorpg'], year: 2004 },
  { id: 3, name: 'Metal Gear Solid', genres: ['stealth', 'action-adventure'], year: 1998 },
  { id: 4, name: 'Sonic Adventure 2', genres: ['platformer'], year: 2001 },
  { id: 5, name: 'Age of Empires 2', genres: ['real-time-strategy'], year: 1999 }
]

module.exports = {
  // GET /games
  index: (req, res) => {
    res.json(games)
  },

  // GET /games/:id
  show: (req, res) => {
    const { id } = req.params

    const game = games.find(game => game.id === +id)

    if (!game) {
      res.status(404)
      res.json({ message: "Game not found!" })
    } else {
      res.json(game)
    }
  },

  // POST /games
  create(req, res) {
    const { name, genres, year } = req.body;

    const newGame = {
      id: Math.floor(Math.random() * 999999),
      name,
      genres,
      year
    }

    games.push(newGame);

    res.status(201).json(newGame);
  },
  // PUT /games/:id
  update(req, res) {
    const { id } = req.params;
    const { name, year } = req.body;

    const game = games.find(game => game.id === +id);

    if (!game) {
      res.status(404);
      res.json({ message: "Game not found!" });
    } else {
      if (typeof name === 'string') game.name = name;
      if (typeof year === 'number') game.year = year;
      res.json(game);
    }
  },

  // DELETE /games/:id
  delete(req, res) {
    const { id } = req.params;

    const gameIndex = games.findIndex(game => game.id === +id);

    if (gameIndex === -1) {
      res.status(404);
      res.json({ message: "Game not found!" });
    } else {
      games.splice(gameIndex, 1);
      res.json({ message: "Game deleted!" });
    }
  },
  // POST /games/:id/genres
  addGenre(req, res) {
    const { id } = req.params;
    const { genre } = req.body;

    const game = games.find(game => game.id === +id);

    if (!game) {
      res.status(404);
      res.json({ message: "Game not found!" });
    } else {
      if (!game.genres.includes(genre)) {
        game.genres.push(genre);
        res.json(game);
      } else {
        res.status(400);
        res.json({ message: "Genre already exists!" });
      }
    }
  },
  // DELETE /games/:id/genres/:genre
  removeGenre(req, res) {
    const { id, genre } = req.params;
    const game = games.find(game => game.id === +id);
    if (!game) {
      res.status(404);
      res.json({ message: "Game not found!" });
    } else {
      const genreIndex = game.genres.indexOf(genre);
      if (genreIndex === -1) {
        res.status(404);
        res.json({ message: "Genre not found!" });
      } else {
        game.genres.splice(genreIndex, 1);
        res.json(game);
      }
    }
  }

}