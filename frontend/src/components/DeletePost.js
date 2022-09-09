import '../styles/CreatePost.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";

function DeletePost() {
  //recupere parametre id du post
  let params = useParams();
  let navigate = useNavigate();


  useEffect(() => {
    let reponse = supprimerPost();
        reponse
          .then(function () {
            let path = `../all`;
            navigate(path);
          });
  }, []);

  
  
      async function supprimerPost() {
        console.log('delete');
        const res = await fetch(`http://localhost:3000/api/post/${params.postId}`, {
          method: "DELETE",
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('admin')
          }
        });
        return await res.json();
  
      }
}

export default DeletePost
