import '../styles/CreatePost.css'
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  let navigate = useNavigate();

  let post = {
    titre: '',
    contenu: ''
  };


  const ajouterPost = () => {
    console.log("ajoute post click");
    post.titre = document.getElementById('titre').value;
    post.contenu = document.getElementById('contenu').value;

    
  


    let reponse = envoyerPost(post);
    reponse
      .then(function () {

        // let path = `../all`;
        // navigate(path);

      });
  }

  function envoyerPost(post) {
    return fetch("http://localhost:3000/api/post", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(post)
    })
      .then(function (res) {
        return res.json();
      })

  }

  return (

    <div className="gpm-posts">
      <div className='gpm-card-post-new'>
        <div className='gpm-label-input ajout'>
          <label htmlFor="titre">Titre</label>
          <input type="text" placeholder="Titre du post" id="titre"></input>
        </div>
        <div className='gpm-label-input ajout'>
          <label htmlFor="contenu">Contenu</label>
          <textarea id="contenu" placeholder="Contenu du post"></textarea>
        </div>
        <input type="file" id="image" accept='image/png, image/jpeg'></input>
        {/* <button className='btn-ajouter-image'>Ajouter une image</button> */}
      </div>
      <button onClick={() => ajouterPost()} className='btn-ajouter'>Publier</button>
    </div>
  )


}

export default CreatePost
