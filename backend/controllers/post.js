const Post = require('../models/Post');
const fs = require('fs');
const { now } = require('mongoose');

//controller qui récupere tous les posts
// renvoie un tableau de tous les posts
exports.getAllPost = (req, res, next) => {
    Post.find()
        .then(posts => {
            console.log('toutsimplement',req.auth.admin);
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
    console.log("create post backend");
    // console.log(JSON.stringify(req.body.image));
    //transforme en objet sauce


    console.log('post', req.body.post);
    console.log(req.file);
    console.log('user',req.body.username);
    const postObject = JSON.parse(req.body.post);
    //supprime l'id car créé par mongodn automatiquement
    delete postObject._id;
    //supprime le userId pour mettre le userID authentifié 
    delete postObject._userId;
    let fichier;
    // crée une instance du modèle Post
    if (req.file) {
        fichier = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    } else {
        fichier = ' ';
    }

    console.log('ajour sans image',fichier);
    const post = new Post({
        // 
        ...postObject,
        // initialise le userId avec le userId authentifié
        userId: req.auth.userId,
        // initialise la date de crétion du post
        datePost: Date.now(),
        // définit l url de l'image
        // imageUrl: 'testimage',
        
        imageUrl: fichier,
        // initialise les tableaux like, dislike à vide
        usersLiked: [],
        userName: req.body.username
    });
    // enregistre le post dans la bdd
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

//controller qui modifie un post
//deux possibilités : une modif avec un fichier image ou sans fichier image
exports.modifyPost = (req, res, next) => {
    //on verifie la présence du fichier image
    console.log('enlever image un',req.file);
    const postObject = req.file ? {
        // si fichier image,  transforme en objet post et récupère le chemin du fichier image sinon recupere les données modifiées du post
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...JSON.parse(req.body.post) };
    console.log('enlever image',req.body.post);
    //supprime le userId pour mettre le userID authentifié 
    delete postObject._userId;

    Post.findOne({ _id: req.params.id })
        .then((post) => {

            //controle si l'utilisateur a le droit de modifier le fichier
            if (post.userId != req.auth.userId && req.auth.admin === false) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                console.log('eximage',post.imageUrl);

                //met à jour le post
                Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => {
                        console.log('aieieie',postObject.imageUrl);
                        //si image modifiée,supprime l'ancienne image du repertoire image
                        if (req.file || postObject.imageUrl === ' ' ) {
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
            console.log(post.userId);
            console.log(req.auth.userId);
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

    console.log('count');
    //recherche le post
    Post.findOne({ _id: req.params.id })
        .then(post => {
            let usersLiked = post.usersLiked;
            //cherche si le userID est dans le tableau
            let myIndexLike = usersLiked.indexOf(req.auth.userId);
            console.log(myIndexLike);
            // si userId est dans le tableau usersLiked alors je l'enleve
            if (myIndexLike !== -1) {
                console.log("doit supprimer");
                usersLiked.splice(myIndexLike, 1);

                Post.updateOne({ _id: req.params.id }, { usersLiked: usersLiked })
                    .then(() => res.status(200).json({ message: 'like supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                //sinon userId n'est pas dans le tableau, l'ajouter dans le tableau
                //ajoute le userId qui like
                console.log("doit ajouter");
                usersLiked.push(req.auth.userId);

                Post.updateOne({ _id: req.params.id }, { usersLiked: usersLiked })
                    .then(() => res.status(200).json({ message: 'like ajouté !' }))
                    .catch(error => res.status(400).json({ error }));

            }
        })
        .catch(error => res.status(500).json({ error }));
};