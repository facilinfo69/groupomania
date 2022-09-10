import '../styles/CreatePost.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

//utilisé pour créer ou modifier un post
function CreatePost() {
  //recupere parametre si parametre mettre en mode modif sinon mode creation
  let params = useParams();
  let navigate = useNavigate();
  // initialise image à vide
  const [image, setImage] = useState({ preview: '', data: '' });

  let [postModif, setPostModif] = useState(null);

  let postCreate = {
    titre: '',
    contenu: ''
  };

  const annuler = () => {
    let path = `../all`;
    navigate(path);
  }


  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img);
    if (postModif != null) {postModif.imageUrl = img.preview};
  }

  const supprImageClick = (e) => {
    const img = {
      preview: ' ',
      data: ' ',
    }
    setImage(img);
    if (postModif != null) {postModif.imageUrl = img.preview};
  }

  //recupere les données du post à modifier et met à jour la variable postModif (objet post)
  async function recupererPost() {
    return fetch(`http://localhost:3000/api/post/${params.postId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('admin')
      }
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (value) {
        setPostModif(value);
      })
      .catch(function (err) {
        // Une erreur est survenue
      });
  }


   // Mode modification post
  if (params.postId) {
    // besoin de récupérer les données du post pour la modification
    if (postModif === null) {
      recupererPost();
    } else {

      const modifierPost = () => {
        //recupere les infos des inputs titre et contenu 
        postModif.titre = document.getElementById('titre').value;
        postModif.contenu = document.getElementById('contenu').value;
        //formate à formData pour envoyer au backend pour la gestion du file
        let postString = JSON.stringify(postModif);
        let formData = new FormData();
        formData.append('post', postString);
        formData.append('file', image.data);
        // si modif ok, retourne à la page de tous les posts
        let reponse = modiferPostBd(formData);
        reponse
          .then(function () {
            let path = `../all`;
            navigate(path);
          });
      }

      // modifie le post en base de données coté backend
      async function modiferPostBd(formData) {
        return fetch(`http://localhost:3000/api/post/${params.postId}`, {
          method: "PUT",
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('admin')
          },
          body: formData
        })
          .then(function (res) {
            return res.json();
          })
      }

      return (
        <div className="gpm-posts modif">
          <div className='gpm-card-post'>
            <form id='formElem'>
              <div className='gpm-card'>
                <input type="text" placeholder="Titre du post" id="titre" defaultValue={postModif.titre} ></input>
              </div>

              <div className="image-upload">
                {postModif.imageUrl !== ' ' ? <label className='file-label' htmlFor="file"><i className="fa-solid fa-image"></i><i className="fa-solid fa-arrows-rotate"></i></label>
                  : <label className='file-label' htmlFor="file"><i className="fa-solid fa-image">+</i></label>}
                <input className='file-input' type="file" id="file" name='file' onChange={handleFileChange}></input>

                <div className="image-suppr">
                  {postModif.imageUrl !== ' ' ? <button className='file-label' id="filesuppr" onClick={supprImageClick} ><i className="fa-solid fa-image"></i><i className="fa-solid fa-trash"></i></button>
                    : null}
                </div>
              </div>

              {postModif.imageUrl !== ' ' ? <img src={postModif.imageUrl} alt='preview' className='image'></img> : null}

              <div className='gpm-label-input ajout'>
                <textarea placeholder="Contenu du post" id="contenu" defaultValue={postModif.contenu} ></textarea>
              </div>
            </form>

            <div className='bouton-create'>
              <button onClick={() => modifierPost()} className='btn-ajouter'><i className="fa-solid fa-circle-check"></i></button>
              <button onClick={() => annuler()} className='btn-annuler'><i className="fa-solid fa-circle-xmark"></i></button>
            </div>
          </div>
        </div>
      )
    }
  }
  
  // Mode création post
  if (!params.postId) {
    const ajouterPost = () => {
      //recupere les infos des inputs titre et contenu 
      postCreate.titre = document.getElementById('titre').value;
      postCreate.contenu = document.getElementById('contenu').value;
      //formate à formData pour envoyer au backend pour la gestion du file
      let postString = JSON.stringify(postCreate);
      let formData = new FormData();
      formData.append('post', postString);
      formData.append('file', image.data);
      formData.append('username', localStorage.getItem('username'));
      // si création ok, retourne à la page de tous les posts
      let reponse = envoyerPost(formData);
      reponse
        .then(function () {
          let path = `../all`;
          navigate(path);
        });
    }
    // envoie les données pour créer le post : titre et contenu, données fichier image, et le nom de l'utilisateur coté backend
    function envoyerPost(formData) {
      return fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('admin')
        },
        body: formData
      })
        .then(function (res) {
          return res.json();
        })
    }

    return (
      <div className="gpm-posts ajout">
        <div className='gpm-card-post'>
          <form id='formElem'>
            <div className='gpm-card'>
              <input type="text" placeholder="Titre du post" id="titre"></input>
            </div>

            <div className="image-upload-create">
              <label className='file-label' htmlFor="file">
                <i className="fa-solid fa-image">+</i>
              </label>
              <input className='file-input' type="file" id="file" name='file' onChange={handleFileChange}></input>
              {image.preview ? <img src={image.preview} alt='preview' className='image'></img> : null}
            </div>

            <div className='gpm-label-input ajout'>
              <textarea id="contenu" placeholder="Contenu du post"></textarea>
            </div>
          </form>

          <div className='bouton-create'>
            <button onClick={() => ajouterPost()} className='btn-ajouter'><i className="fa-solid fa-circle-check"></i></button>
            <button onClick={() => annuler()} className='btn-annuler'><i className="fa-solid fa-circle-xmark"></i></button>
          </div>
        </div>
      </div>
    )
  }
}

export default CreatePost
