
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Like from "./Like";
import '../styles/Posts.css'

function Posts() {
  let [posts, setPosts] = useState(null);

  useEffect(() => {
    recupererPosts();
  }, [])


  function recupererPosts() {
    return fetch("http://localhost:3000/api/post", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')+ ' ' + localStorage.getItem('admin')
      }
    })
      .then(function (res) {
        if (res.ok) {

          return res.json();

        }
      })
      .then(function (value) {
        console.log(value);
        setPosts(value);
        return value;
      })
      .catch(function (err) {
        // Une erreur est survenue
      });


  }

  if (posts == null) {
    return (<div>loading</div>)
  } else {
    return (

      <div className="gpm-posts">
        {
          posts.map((post, index) => {
            console.log(post.usersLiked);
            let myIndexLike = post.usersLiked.indexOf(localStorage.getItem('userid'));
            let nbAime = post.usersLiked.length;
            let aime = false;
            if (myIndexLike !== -1) {
              aime=true;
              console.log('rouge');
            } else {
              aime=false;
              console.log('gris');
            }
            return (
              // <Link className="lienposts" to= {`/posts/${post._id}`}>
              <>
              <div key={post._id} className='gpm-card-post'>
                <div className="gpm-card titre">{post.titre}</div>
                <div className="gpm-card contenu">
                  {post.contenu}
                  <img src={post.imageUrl} alt="test image" className="image"/>
                </div>
                <div className="gpm-card auteur">
                  <span>posté le {post.datePost}</span>
                  <span>par {post.userId}</span>
                </div>
              </div>
              <div>
                <Like testid={post._id} aimeicone={aime} nbAime={nbAime}/>
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
