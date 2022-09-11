
import { useEffect, useState } from "react";
import Like from "./Like";
import '../styles/Posts.css'

function Posts() {
  let [posts, setPosts] = useState(null);
  let [retour, setRetour] = useState(0);
  let [adminBd, setAdmin] = useState('');

  // recupere tous les post sera lancé à chaque fois que la variable retour sera mis à jour cad à chaque click sur le coeur dans le composant Like.
  useEffect(() => {
    let promessePosts = recupererPosts();
    promessePosts
      .then(function (valeur) {
        setPosts(valeur.posts);
        setAdmin(valeur.admin);
      });
  }, [retour])

  //fonction qui récupére tous les posts : objet Posts, admin true or false decodé
  async function recupererPosts() {
    return fetch("http://localhost:3000/api/post", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('admin')
      }
    })
      .then(function (res) {
        if (res.ok) { return res.json(); }
      })
      .then(function (value) {
        return value;
      })
      .catch(function (err) {
        // Une erreur est survenue
      });
  }

  //en attente du chargement : à prévoir un loading plus design !
  if (posts == null) {
    return (<div>loading</div>)
  } else {
    //classé les posts par date antéchronologique (du plus récent au plus ancien)
    posts.sort(function (a, b) {
      return new Date(b.datePost) - new Date(a.datePost)
    });

    return (
      <div className="gpm-posts">
        
          {
            //parcoure post par post

            posts.map((post, index) => {

              let admin = 'false';
              //verfier si il peut modifier et supprimer soit utilisateur a créé le post, soit administrateur
              if (post.userId === localStorage.getItem('userid') || adminBd === true) {
                admin = true;
              } else {
                admin = false;
              }
              // voir si utilisateur a aimé le post ou non
              let aime = false;
              let myIndexLike = post.usersLiked.indexOf(localStorage.getItem('userid'));
              //si utilisateur dans tableau des like initialisé aime à true qui permetra dans le composant Like de mettre le coeur en rouge 
              if (myIndexLike !== -1) {
                aime = true;
              } else {
                aime = false;
              }
              //recupere le nombre de j'aime
              let nbAime = post.usersLiked.length;

              //formater la date du post au format date de france
              let dateDuPost = new Date(post.datePost);
              let dateDuPostFormate = dateDuPost.toLocaleDateString('fr');

              return (
                <>
                  
                    <div className='gpm-card-post'>
                      <div className="gpm-card titre">{post.titre}</div>

                      <div className="gpm-card contenu">
                        {post.imageUrl === '' ? null : <img src={post.imageUrl} alt={post.titre} className="image" />}
                        <pre className="contenuarea">{post.contenu}</pre>
                      </div>

                      <div className="gpm-card auteur">
                        <span>posté le {dateDuPostFormate}</span>
                        <span >par {post.userName}</span>
                      </div>

                      <div className='bouton'>
                        {/* composant Like coeur pour aimer et bouton modifier/supprimer si admin ou utilisateur qui a créé le post */}
                        <Like retour={retour} setRetour={setRetour} id={post._id} aimeicone={aime} nbAime={nbAime} admin={admin} />
                      </div>
                    </div>
                    <a className="bouton-ancre" href="#"><i key={`post.i-${index}`} className="fa-solid fa-circle-up"></i></a>
                  
                </>
              )
            })
          }
        
      </div>)
  }

}

export default Posts
