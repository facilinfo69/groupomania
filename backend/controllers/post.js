const Post = require('../models/Post');
const fs = require('fs');
const { now } = require('mongoose');

//controller qui récupere tous les posts
// renvoie un tableau de tous les posts
exports.getAllPost = (req, res, next) => {
    Post.find()
        .then(posts => {
            res.status(200).json({
                posts:posts,
                admin: req.auth.admin
            })
        })
        .catch(error => res.status(400).json({ error }));
};

//controller qui récupere un post selon l'id selectionné
// renvoie le post avec l'id selectionné
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

//controller qui crée un post
// { post: Objet/,
//   image: File } recu par le frontend
exports.createPost = (req, res, next) => {    
    //transforme en objet Post
    const postObject = JSON.parse(req.body.post);
    //supprime l'id car créé par mongodb automatiquement
    delete postObject._id;
    //supprime le userId pour mettre le userID authentifié 
    delete postObject._userId;
    let fichier;
    //verifie présence fichier image
    if (req.file) {
        fichier = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    } else {
        fichier = '';
    }

    // crée une instance du modèle Post
    const post = new Post({
        ...postObject,
        // initialise le userId avec le userId authentifié
        userId: req.auth.userId,
        // initialise la date de crétion du post
        datePost: Date.now(),
        // définit l url de l'image
        imageUrl: fichier,
        // initialise les tableaux like,
        usersLiked: [],
        // initialise le nom de l'utilisateur
        userName: req.body.username
    });
    // enregistre le post dans la bdd
    post.save()
        .then(() => {
            res.status(201).json({ message: 'Post enregistré !' })
        })
        .catch(error => res.status(400).json({ error }));
};

//controller qui modifie un post
//deux possibilités : une modif avec un fichier image ou sans fichier image
exports.modifyPost = (req, res, next) => {
    //on verifie la présence du fichier image
    const postObject = req.file ? {
        // si fichier image,  transforme en objet post et récupère le chemin du fichier image sinon recupere les données modifiées du post
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...JSON.parse(req.body.post) };
    //supprime le userId pour mettre le userID authentifié 
    delete postObject._userId;

    Post.findOne({ _id: req.params.id })
        .then((post) => {
            //controle si l'utilisateur a le droit de modifier le fichier
            if (post.userId != req.auth.userId && req.auth.admin === false) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                //met à jour le post
                Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => {
                        //si image modifiée,supprime l'ancienne image du repertoire image
                        if (req.file || postObject.imageUrl === '' ) {
                            const filename = post.imageUrl.split('/images/')[1];
                            fs.unlink(`images/${filename}`, () => { });
                        }
                        res.status(200).json({ message: 'post modifié !' });
                    })
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
};

//controller qui supprime le post
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            //controle si l'utilisateur a le droit de supprimer le fichier
            if (post.userId != req.auth.userId && req.auth.admin === false) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                //supprime l'image du repertoire
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    //supprime le post de la bdd
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            }
        })
        .catch(error => res.status(500).json({ error }));
};

//controller qui definit le statut like/dislike
// je recois :  { userId: String
//        }
exports.modifyLike = (req, res, next) => {
    //recherche le post
    Post.findOne({ _id: req.params.id })
        .then(post => {
            let usersLiked = post.usersLiked;
            //cherche si le userID est dans le tableau
            let myIndexLike = usersLiked.indexOf(req.auth.userId);
            // si userId est dans le tableau usersLiked alors je l'enleve
            if (myIndexLike !== -1) {
                usersLiked.splice(myIndexLike, 1);
                //met à jour la bd
                Post.updateOne({ _id: req.params.id }, { usersLiked: usersLiked })
                    .then(() => res.status(200).json({ message: 'like supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                //sinon userId n'est pas dans le tableau, l'ajouter dans le tableau
                //ajoute le userId qui like
                usersLiked.push(req.auth.userId);
                //met à jour la bd
                Post.updateOne({ _id: req.params.id }, { usersLiked: usersLiked })
                    .then(() => res.status(200).json({ message: 'like ajouté !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};