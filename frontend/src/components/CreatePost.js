import '../styles/CreatePost.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

function CreatePost() {
  //recupere parametre si parametre mettre en mode modif sinon mode creation
  let params = useParams();

  let navigate = useNavigate();

  let[count, setCount] = useState(1);
  let[countContenu, setCountContenu] = useState(1);
  const [inputTitre, setInputTitre] = useState(''); 
  const [inputContenu, setInputContenu] = useState(''); 
  const [image, setImage] = useState({ preview: '', data: '' });

  let [postModif, setPostModif] = useState(null);

  let postCreate = {
    titre: '',
    contenu: ''
  };


  const handleTitreChange = (e) => {
    console.log(count);
    count++;
    setCount(count);
    setInputTitre(document.getElementById('titre').value);
  }

  const handleTitreContenu = (e) => {
    countContenu++;
    setCountContenu(countContenu);
    setInputContenu(document.getElementById('contenu').value);
  }


  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    console.log(img);
    setImage(img);
    console.log(image.preview);
  }

  function recupererPost() {
    return fetch(`http://localhost:3000/api/post/${params.postId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
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
      
      console.log(count);
      // setInputTitre(postModif.titre);

      const modifierPost = () => {
        postCreate.titre = document.getElementById('titre').value;
        postCreate.contenu = document.getElementById('contenu').value;
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

      function modiferPostBd(formData) {
        return fetch(`http://localhost:3000/api/post/${params.postId}`, {
          method: "PUT",
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: formData
        })
          .then(function (res) {
            return res.json();
          })
  
      }

      return (

        <div className="gpm-posts">
          <div className='gpm-card-post-new'>
            <form id='formElem'>
              <div className='gpm-label-input ajout'>
                <label htmlFor="titre">Titre</label>
                {count === 1 ?
                <input type="text" placeholder="Titre du post" id="titre"  onClick={handleTitreChange} value={postModif.titre} ></input>
                 : 
                 <input type="text" placeholder="Titre du post" id="titre"  onChange={handleTitreChange} value={inputTitre} ></input>}
                {/* <input type="text" placeholder="Titre du post" id="titre"  onChange={handleTitreChange} value={postModif.titre} ></input> */}
              </div>
              <div className='gpm-label-input ajout'>
                <label htmlFor="contenu">Contenu</label>
                {countContenu === 1 ?
                <textarea placeholder="Contenu du post" id="contenu"  onClick={handleTitreContenu} value={postModif.contenu} ></textarea>
                 : 
                 <textarea placeholder="Contenu du post" id="contenu"  onChange={handleTitreContenu} value={inputContenu} ></textarea>}
                {/* <textarea id="contenu" placeholder="Contenu du post" value={postModif.contenu}></textarea> */}
              </div>
              

              <div class="image-upload">
                <label className='file-label' htmlFor="file">
                  Modifier l'image
                </label>

                <input className='file-input' type="file" id="file" name='file' onChange={handleFileChange}></input>
              </div>



            </form>

            {postModif.imageUrl ? <img src={postModif.imageUrl} alt='preview' className='image'></img> : null}
            {image.preview ? <img src={image.preview} alt='preview' className='image'></img> : null}

            {/* <button className='btn-ajouter-image'>Ajouter une image</button> */}
          </div>
          <button onClick={() => modifierPost()} className='btn-ajouter'>Modifier</button>
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
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: formData
      })
        .then(function (res) {
          return res.json();
        })

    }

    return (
      <div className="gpm-posts">
        <div className='gpm-card-post-new'>
          <form id='formElem'>
            <div className='gpm-label-input ajout'>
              <label htmlFor="titre">Titre</label>
              <input type="text" placeholder="Titre du post" id="titre" onChange={handleTitreChange} value={inputTitre}></input>
            </div>
            <div className='gpm-label-input ajout'>
              <label htmlFor="contenu">Contenu</label>
              <textarea id="contenu" placeholder="Contenu du post" onChange={handleTitreContenu} value={inputContenu}></textarea>
            </div>
            {/* <input type="file" id="file" name='file' onChange={handleFileChange}></input> */}
            <div class="image-upload">
                <label className='file-label' htmlFor="file">
                  Ajouter une image
                </label>

                <input className='file-input' type="file" id="file" name='file' onChange={handleFileChange}></input>
              </div>
            {/* <div className='file-input'>
              <input className='file' type="file" id="file" name='file' onChange={handleFileChange}></input> */}
            {/* <label htmlfor="file">Select file</label> */}
            {/* </div> */}

          </form>
          {image.preview ? <img src={image.preview} alt='preview' className='image'></img> : null}

          {/* <button className='btn-ajouter-image'>Ajouter une image</button> */}
        </div>
        <button onClick={() => ajouterPost()} className='btn-ajouter'>Publier</button>
      </div>
    )
  }
  // else {

  //   return (

  //     <div className="gpm-posts">
  //       <div className='gpm-card-post-new'>
  //         <form id='formElem'>
  //           <div className='gpm-label-input ajout'>
  //             <label htmlFor="titre">Titre</label>
  //             <input type="text" placeholder="Titre du post" id="titre"></input>
  //           </div>
  //           <div className='gpm-label-input ajout'>
  //             <label htmlFor="contenu">Contenu</label>
  //             <textarea id="contenu" placeholder="Contenu du post"></textarea>
  //           </div>
  //           <input type="file" id="file" name='file'></input>
  //         </form>
  //         {/* {post.imageUrl ? <img src={post.imageUrl} alt='image preview' className='image'></img> : null} */}

  //         {/* <button className='btn-ajouter-image'>Ajouter une image</button> */}
  //       </div>
  //       {/* <button onClick={() => ajouterPost()} className='btn-ajouter'>Publier</button> */}
  //     </div>
  //   )


  // }




}

export default CreatePost
