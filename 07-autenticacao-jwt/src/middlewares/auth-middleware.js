const jwt = require('jsonwebtoken');
const users = require('../models/users');

const secret = '123456';

const authMiddleware = (req, res, next) => {

    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authToken.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, secret);

        const user = users.find(user => user.username === decodedToken.username);

        if(!user){
            return res.status(401).json({ message: 'Invalid user' });
        }

        req.authenticatedUser = user;

        next();
    }catch(error){
        res.status(400).json({ message: 'Token is not valid' });
    }

    console.log(token);

    next();
};

module.exports = {
    authMiddleware
};