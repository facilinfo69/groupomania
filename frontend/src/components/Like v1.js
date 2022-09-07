import { Link } from 'react-router-dom';

function Like(props) {
    const id = props.testid;
    const aime = props.aimeicone;
    const nbAime = props.nbAime;


    function likerPost() {
        console.log('aimerpost');

    }
 

    return (
        <>
            {/* <button onClick={() => likerPost()}><i className="fa-regular fa-heart" ></i> </button> */}

            {aime ? <Link to={`../like-post/${id}`}><i className="fa-solid fa-heart" ></i></Link>
            :<Link to={`../like-post/${id}`}><i className="fa-regular fa-heart" ></i></Link>}
            <span>{nbAime}</span>
            <Link to={`../modify-post/${id}`}>Modifier</Link>
            <Link to={`../delete-post/${id}`}>supprimer</Link>
            
        </>

    )

}


export default Like