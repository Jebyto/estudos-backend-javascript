const users = require('../models/user-model');

module.exports = {
    dashboard(req, res) {
        console.log(req.session.authenticated);
        const user = req.session.user;
        res.render('dashboard', { user });
    },
    users(req, res) {
        res.render('users', { users });
    }
}