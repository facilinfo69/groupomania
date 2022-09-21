//application Express
const express = require('express');
//importer mongoose pour faciliter l'accès à la base de données
const mongoose = require('mongoose');
// importer le routeur pour les posts
const postRoutes = require('./routes/post');
// importer le routeur pour la connexion/inscription des utilisateurs
const userRoutes = require('./routes/user');
// permet l'accès au path du serveur
const path = require('path');
// protège l'application de certaines vulnérabilités (en-têtes HTTP)
const helmet = require('helmet');
// permet d'externaliser les variables de configuration
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

// connexion à la base de données mongoDb (_USER, _PASSWORD dans le fichier .env.local en test)
mongoose.connect(`mongodb+srv://${process.env._USER}:${process.env._PASSWORD}@groupomania.hm6xdhl.mongodb.net/?retryWrites=true&w=majority`,
{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use(helmet());

//réponse du serveur
//recupere le corps JSON
app.use(express.json());

app.use(express.static('../frontend/build'));



//implémentation CORS communication entre les deux serveurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //permet l'affichage des images avec la protection helmet
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
});

// enregister les routes
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

//gérer la ressource images de manière statique 
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/*',(_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

module.exports = app;