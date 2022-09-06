const express = require('express');
const router = express.Router();

// besoin d'une autorisation pour les routes post "bearer token envoyé par le frontend"
const auth = require('../middleware/auth');
// permet de gérer les fichiers entrants pour le téléchargement d'image
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

//route get qui récupere tous les posts avec authentification
router.get('/',auth, postCtrl.getAllPost);
//route get qui récupére un post avec son id avec authentification
router.get('/:id',auth, postCtrl.getOnePost); 
//route post qui crée un post avec authentification
router.post('/',auth, multer, postCtrl.createPost);
//route put qui met à jour le post avec son id avec authentification
router.put('/:id', auth, multer, postCtrl.modifyPost);
//route delete qui supprimer le post avec son id avec authentification
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;