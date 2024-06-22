const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');

const protectedRouter = express.Router();

protectedRouter.get('/', authMiddleware, (req, res) => {
    const username = req.authenticatedUser.username;

    res.json({ message: `Welcome to the protected route.\n
        Welcome ${username}!` });
});

module.exports = protectedRouter;