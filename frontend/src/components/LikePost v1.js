import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function LikePost(props) {
    //recupere parametre si parametre mettre en mode modif sinon mode creation
    let params = useParams();
    let navigate = useNavigate();

    let id=props.idpost;
    console.log(id);

    useEffect(() => {
        console.log('liker');
        likerPost();
    }, []);

    async function likerPost() {
        return fetch(`http://localhost:3000/api/post/like/${params.postId}`, {
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
                let path = `../all`;
                navigate(path);
            })
            .catch(function (err) {
                // Une erreur est survenue
            });
    }
}

export default LikePost