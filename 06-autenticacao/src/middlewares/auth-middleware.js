const authMiddleware = (req, res, next) => {
    if(req.session.authenticated) {
        next();
    }else{
        res.redirect('/');
    }
}

const ensureAdmin = (req, res, next) => {
    if(req.session.user.role !== 'admin') {
        return res.redirect('/dashboard');
    }
    next();
}

module.exports = {
    authMiddleware,
    ensureAdmin
};