
import { useEffect, useState } from "react";
import Like from "./Like";
import '../styles/Posts.css'


function Posts() {
  let [posts, setPosts] = useState(null);
  let [retour, setRetour] = useState(0);

  useEffect(() => {
    console.log('retour', retour);
    let promose1 = recupererPosts();
    promose1
      .then(function (valeur) {

        console.log(valeur);
        setPosts(valeur);

      });

    console.log(promose1);
  }, [retour])


  async function recupererPosts() {
    return fetch("http://localhost:3000/api/post", {
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
        // setPosts(value);
        return value;
      })
      .catch(function (err) {
        // Une erreur est survenue
      });


  }

  if (posts == null) {
    return (<div>loading</div>)
  } else {
    console.log(posts);
    return (

      <div className="gpm-posts">
        {
          posts.map((post, index) => {
            console.log(post.usersLiked);
            let myIndexLike = post.usersLiked.indexOf(localStorage.getItem('userid'));
            let nbAime = post.usersLiked.length;
            let aime = false;
            if (myIndexLike !== -1) {
              aime = true;
              console.log('rouge');
            } else {
              aime = false;
              console.log('gris');
            }
            //formater la date du post au format date de france
            let dateDuPost = new Date(post.datePost);
            let dateDuPostFormate = dateDuPost.toLocaleDateString('fr');
            
            return (
              // <Link className="lienposts" to= {`/posts/${post._id}`}>
              <>
                <div key={post._id} className='gpm-card-post'>
                  <div key={`post.titre-${index}`} className="gpm-card titre">{post.titre}</div>

                  <div key={`post.contenu-${index}`} className="gpm-card contenu">
                    
                    <img key={`post.image-${index}`} src={post.imageUrl} alt="test" className="image" />
                    <pre  className="contenuarea">{post.contenu}</pre>
                
                    
                  </div>
                  <div key={`post.auteur-${index}`} className="gpm-card auteur">
                    <span key={`post.postele-${index}`}>posté le {dateDuPostFormate}</span>
                    <span key={`post.postepar-${index}`}>par {post.userId}</span>
                  </div>

                  <div key={`post.Like-${index}`} className='bouton'>
                    {/* <LikePost posts={posts} setpost={setPosts} /> */}
                    <Like retour={retour} setRetour={setRetour} id={post._id} aimeicone={aime} nbAime={nbAime} />
                  </div>

                  

                </div>

              </>
              // </Link>
            )
          })
        }


      </div>)
  }

}

export default Posts
