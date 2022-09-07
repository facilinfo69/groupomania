import { Link } from 'react-router-dom';
import '../styles/Like.css'
// function Like(props) {
//     let id = props.id;
//     let aime = props.aimeicone;
//     let nbAime = props.nbAime;
function Like(props) {
    let { retour, setRetour, id, aimeicone, nbAime } = props;
    console.log('id', id);
    console.log('aime', aimeicone);

    function likePost() {
        console.log('aimerpost');
        let reponse = likerPost(id);
        reponse
            .then(function (valeur) {
                console.log('rafraichirs');
                console.log(retour);
                setRetour(retour + 1);
            });

        //   let path = `../all`;
        //         navigate(path);

    };




    function likerPost(id) {
        return fetch(`http://localhost:3000/api/post/like/${id}`, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
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
                <Link className='lien' to={`../modify-post/${id}`}><i className="fa-regular fa-pen-to-square"></i></Link>
                <Link className='lien' to={`../delete-post/${id}`}><i className="fa-solid fa-trash-can"></i></Link>
            </div>





        </>

    )

}






export default Like