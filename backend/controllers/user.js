const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

/** 
 * route qui permet de s'inscrire
   {
    "email": "sivignonp@free.fr",
    "password": "test"
 }*/
exports.signup = (req, res, next) => {
    console.log("signup");
    //verifier force du mot de passe
     var schemaPassword = new passwordValidator();
    //propriétés du mot de passe
    schemaPassword
        .is().min(8)                                    // Minimum 8 caractères
        .is().max(50)                                   // Maximum 50 caractères
        .has().uppercase()                              // doit avoir une Majuscule
        .has().lowercase()                              // doit avoir minuscule
        .has().digits(2)                                // au moins 2 chiffres
         .has().not().spaces()                           // pas d'espace
    //on peut ajouter une blacklist de mot de passe
    //.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
     if (schemaPassword.validate(req.body.password)) {
        //hachage du mot de passe
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                console.log('hash');
                //ajour de l'utilisateur dans la base de données
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    admin: false
                });
                user.save()
                    // réponse attendue : { message: string }
                    .then(() => res.status(201).json({ message: 'compte enregistré !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
            

    } else {
        return res.status(401).json({ message: 'mot de passe non valide!' });
    }
        
   
        
        
};


/** 
 * route qui permet de se connecter
   {
    "email": "sivignonp@free.fr",
    "password": "test"
 }
 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 *
 */
exports.login = (req, res, next) => {
    console.log("login test");
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    // réponse attendue :
                    //{ userId: string,
                    // token: string }
                    res.status(200).json({
                        admin: jwt.sign(
                            { admin: user.admin},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                            ),
                        userId: user._id,
                        username: user.username,
                        // token web JSON signé
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.admin = (req, res, next) => {
    console.log("login admin");
    console.log('ges',req.auth.admin);
};