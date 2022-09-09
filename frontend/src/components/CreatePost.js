import '../styles/CreatePost.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

function CreatePost() {
  //recupere parametre si parametre mettre en mode modif sinon mode creation
  let params = useParams();

  let navigate = useNavigate();

  // let [count, setCount] = useState(1);
  // let [countContenu, setCountContenu] = useState(1);
  // const [inputTitre, setInputTitre] = useState('');
  // const [inputContenu, setInputContenu] = useState('');
  const [image, setImage] = useState({ preview: '', data: '' });

  let [postModif, setPostModif] = useState(null);

  let postCreate = {
    titre: '',
    contenu: ''
  };



  // const handleTitreChange = (e) => {
  //   console.log(count);
  //   count++;
  //   setCount(count);
  //   setInputTitre(document.getElementById('titre').value);
  // }

  // const handleTitreContenu = (e) => {
  //   countContenu++;
  //   setCountContenu(countContenu);
  //   setInputContenu(document.getElementById('contenu').value);
  // }
  const annuler = () => {
    let path = `../all`;
    navigate(path);
  }


  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    console.log(img);
    setImage(img);
    postModif.imageUrl = img.preview;
    console.log(image.preview);
  }

  const supprImageClick = (e) => {
    const img = {
      preview: ' ',
      data: ' ',
    }
    setImage(img);
    postModif.imageUrl = img.preview;
    console.log('supprimage', image);
  }

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
        console.log(value);
        setPostModif(value);
      })
      .catch(function (err) {
        // Une erreur est survenue
      });
  }



  if (params.postId) {
    console.log('modif');
    if (postModif === null) {
      recupererPost();
    } else {
      console.log(postModif);
      console.log(image.data);
      // console.log(count);
      // setInputTitre(postModif.titre);

      const modifierPost = () => {
        postCreate.titre = document.getElementById('titre').value;
        postCreate.contenu = document.getElementById('contenu').value;
        if (image.data === ' ') {
          postCreate.imageUrl = ' ';
        }


        let postString = JSON.stringify(postCreate);

        let formData = new FormData();
        formData.append('post', postString);
        formData.append('file', image.data);

        let reponse = modiferPostBd(formData);
        reponse
          .then(function () {

            let path = `../all`;
            navigate(path);

          });
      }

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
                {/* <label htmlFor="titre">Titre</label> */}

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


              {/* {count === 1 ?
                  <input type="text" placeholder="Titre du post" id="titre" onClick={handleTitreChange} value={postModif.titre} ></input>
                  :
                  <input type="text" placeholder="Titre du post" id="titre" onChange={handleTitreChange} value={inputTitre} ></input>} */}
              {/* <input type="text" placeholder="Titre du post" id="titre"  onChange={handleTitreChange} value={postModif.titre} ></input> */}

              <div className='gpm-label-input ajout'>
                {/* <label htmlFor="contenu">Contenu</label> */}

                <textarea placeholder="Contenu du post" id="contenu" defaultValue={postModif.contenu} ></textarea>

                {/* {countContenu === 1 ?
                  <textarea placeholder="Contenu du post" id="contenu" onClick={handleTitreContenu} value={postModif.contenu} ></textarea>
                  :
                  <textarea placeholder="Contenu du post" id="contenu" onChange={handleTitreContenu} value={inputContenu} ></textarea>} */}
                {/* <textarea id="contenu" placeholder="Contenu du post" value={postModif.contenu}></textarea> */}
              </div>



            </form>



            <div className='bouton-create'>
              <button onClick={() => modifierPost()} className='btn-ajouter'><i className="fa-solid fa-circle-check"></i></button>
              <button onClick={() => annuler()} className='btn-annuler'><i className="fa-solid fa-circle-xmark"></i></button>

            </div>
            {/* {image.preview ? <img src={image.preview} alt='preview' className='image'></img> : null} */}

            {/* <button className='btn-ajouter-image'>Ajouter une image</button> */}
          </div>
          {/* <button onClick={() => modifierPost()} className='btn-ajouter'>Modifier</button> */}
        </div>
      )










    }

  }

  if (!params.postId) {
    console.log('create');
    console.log(image.preview);


    const ajouterPost = () => {
      postCreate.titre = document.getElementById('titre').value;
      postCreate.contenu = document.getElementById('contenu').value;
      let postString = JSON.stringify(postCreate);

      let formData = new FormData();
      formData.append('post', postString);
      formData.append('file', image.data);
      formData.append('username', localStorage.getItem('username'));

      let reponse = envoyerPost(formData);
      reponse
        .then(function () {

          let path = `../all`;
          navigate(path);

        });
    }




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
              {/* <label htmlFor="titre">Titre</label> */}
              <input type="text" placeholder="Titre du post" id="titre"></input>
              {/* <input type="text" placeholder="Titre du post" id="titre" onChange={handleTitreChange} value={inputTitre}></input> */}
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
              {/* <textarea id="contenu" placeholder="Contenu du post" onChange={handleTitreContenu} value={inputContenu}></textarea> */}
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
