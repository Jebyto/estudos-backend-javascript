const users = require('../models/user-model');

module.exports = {
    //GET /
    index: (req, res) => {
        res.render('index');
    },
    // POST /auth/register
    register: (req, res) => {
        const { username, password } = req.body;
        const userAlreadyExists = users.find(user => user.username === username);

        if(userAlreadyExists){
            res.status(400).redirect('/');
            return;
        }

        const newUser = { username, password, role: 'standard' };

        users.push(newUser);
        req.session.authenticated = true;
        req.session.user = newUser;

        res.redirect('/dashboard');
    },
    //POST /auth/login
    login(req, res){
        const { username, password } = req.body;

        const user = users.find(user => user.username.toLowerCase() === username.toLowerCase() && user.password ===  password);

        if(user){
            req.session.authenticated = true;
            req.session.user = user;

            res.redirect('/dashboard');
            return;
        }

        res.status(400).redirect('/');
    },

    // GET /auth/logout
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
};