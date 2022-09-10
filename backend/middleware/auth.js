const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // recupere le token d'authentification userId
        const token = req.headers.authorization.split(' ')[1];
        //recupere le token pour savoir si l'utilisateur est admin ou pas
        const tokenadmin = req.headers.authorization.split(' ')[2];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const decodedtokenAdmin = jwt.verify(tokenadmin, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const admin = decodedtokenAdmin.admin;

        req.auth = {
            userId: userId,
            admin: admin
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};