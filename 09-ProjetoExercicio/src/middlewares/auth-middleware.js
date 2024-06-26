const usersModel = require("../models/users-model");
const jwt = require("jsonwebtoken");

module.exports = {
    ensureAuth (req, res, next) {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({ message: 'Não autorizado' });
        }

        const [, token] = authHeader.split(' ');

        try {
            const { id } = jwt.verify(token, process.env.JWT_KEY);
            const user = usersModel.getUserById(id);

            if(!user){
                return res.status(401).json({ message: 'Usuário não encontrado' });
            }

            req.user = user;
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido' });
        }
    }
}