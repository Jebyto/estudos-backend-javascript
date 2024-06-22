const express = require('express');
const users = require('../models/users');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

const secret = '123456';

authRouter.post('/register', (req, res) => {
      const { username, password } = req.body;
      
      const user = { username, password };

      users.push(user);

      res.status(201).json(user);
})

authRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password ===  password);

    if(!user){
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const payload = { username };

    const token =  jwt.sign(payload, secret, {expiresIn: '10s'});

    res.status(200).json({token});   
})

module.exports = authRouter;