import { useEffect, useState } from 'react';
import '../styles/Signup.css'


function Signup({ authMode, setAuthMode }) {

    let [inscrire, setInscrire] = useState(false);
    let [reponseApi, setreponseApi] = useState(null);

    useEffect(() => {
        if (inscrire) {
            inscrireUser(document.getElementById('username').value, document.getElementById('email').value, document.getElementById('password').value);
        }
    }, [inscrire])

    return reponseApi !== 201 || reponseApi == null ? (
        <div className='gpm-signup'>
            <div className='gpm-label-input'>
                <label htmlFor="username">Nom de l'utilisateur</label>
                <input type="email" placeholder="Nom de l'utilisateur" id="username"></input>
            </div>
            <div className='gpm-label-input'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" id="email"></input>
            </div>
            <div className='gpm-label-input'>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" placeholder="Mot de passe" id="password"></input>
            </div>
            {reponseApi != null ? <div className='gpm-message'>erreur dans l'inscription !</div> : null}
            <button onClick={() => setInscrire(true)}>S'inscrire</button>
        </div>
    ) : (
        
        <div>{setAuthMode('signinok')}
        </div>
        )

    function inscrireUser(username, email, password) {
        console.log(username, email, password);
        return fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
            .then(function (res) {
                if (res.ok) {
                    setreponseApi(res.status);
                    return res.json();
                } else {
                    setreponseApi(res.status);
                    setInscrire(false);
                }
            })
    }
}





export default Signup
