module.exports = function (req, res, next) {
    console.log("middleware C");
    req.middlewareC = 'OK';
    next();
}