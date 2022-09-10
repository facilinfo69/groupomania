import { Link } from 'react-router-dom';
import '../styles/Like.css'
// function Like(props) {
//     let id = props.id;
//     let aime = props.aimeicone;
//     let nbAime = props.nbAime;
function Like(props) {
    let { retour, setRetour, id, aimeicone, nbAime, admin } = props;

    function likePost() {
        //à chaque click sur le coeur, si ok variable reout mis à jour qui permettra de réafficher tous les posts dans le composant Posts
        let reponse = likerPost(id);
        reponse
            .then(function (valeur) {
                setRetour(retour + 1);
            });
    };

    //envoie au backend le post à liker : va mettre à jour le tableau des usersLiked (enleve ou ajoute "toggle")
    function likerPost(id) {
        return fetch(`http://localhost:3000/api/post/like/${id}`, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('admin')
            },

        })
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (value) {
                return value;
            })
            .catch(function (err) {
                // Une erreur est survenue
            });
    }

    return (
        <>
            <div className='coeur'>
                {aimeicone ? <button className='bouton-coeur' onClick={() => likePost()}><i className="fa-solid fa-heart" ></i><span>{nbAime}</span> </button>
                    : <button className='bouton-coeur' onClick={() => likePost()}><i className="fa-regular fa-heart" ></i><span>{nbAime}</span> </button>}
            </div>
            <div className='bouton-action'>
                {admin ? <Link className='lien' to={`../modify-post/${id}`}><i className="fa-regular fa-pen-to-square"></i></Link> : null}
                {admin ? <Link className='lien' to={`../delete-post/${id}`}><i className="fa-solid fa-trash-can"></i></Link> : null}
            </div>
        </>
    )
}

export default Like