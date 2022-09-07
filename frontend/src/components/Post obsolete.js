
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import '../styles/Post.css'

function Post() {
  let [post, setPost] = useState(null);

  useEffect(() => {
    recupererPost();
  }, [post]);

  let params = useParams();
  let navigate = useNavigate();

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
        setPost(value);
        return value;
      })
      .catch(function (err) {
        // Une erreur est survenue
      });


  }



    async function supprimerPost() {
    const res = await fetch(`http://localhost:3000/api/post/${params.postId}`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(function (res) {
      if (res.ok) {

        return res.json();

      }
    })
    .then(function (value) {
      console.log('post supprimé changer de chemin');
      let path = `../all`;
          navigate(path);
    })
    .catch(function (err) {
      // Une erreur est survenue
    });

  }

  
  if (post == null) {
    return (<div>loading </div>)
  } else {
    return (
      <div className="gpm-posts">
        <div key={post._id} className='gpm-card-post'>
          <div className="gpm-card titre">{post.titre}</div>
          <div className="gpm-card contenu">
            {post.contenu}
            <img src={post.imageUrl} alt="test" className="image" />
          </div>
          <div className="gpm-card auteur">
            <span>posté le {post.datePost}</span>
            <span>par {post.userId}</span></div>
        </div>
        <Link to={`../modify-post/${post._id}`}>Modifier</Link>
        <button onClick={() => supprimerPost()} className='btn-ajouter'>Supprimer</button>
        {/* <Link to={`../delete-post/${post._id}`}>Supprimer</Link> */}
      </div>
      )
  }

}

export default Post
