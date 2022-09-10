import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'

function Login() {
    let navigate = useNavigate();

    // simule le click sur le bouton se connecter quand on appuie sur entrée
    const entreeOnClick = (event) => {
        if (event.key === 'Enter') {document.getElementById('bouton').click()};
    }

    //s'execute au click btn se connecter - 
    //va interroger la bdd coté backend et selon la réponse, 
    //afficher un message d'erreur 
    //ou se connecter et afficher la liste de tous les posts
    const seConnecter = () => {
        //interroge la bdd coté backend
        let reponse = connecterUser(document.getElementById('email').value, document.getElementById('password').value);
        reponse
            .then(function (user) {
                if (user.token == null) {
                    alert(user.message);
                } else {
                    localStorage.setItem('token', user.token)
                    localStorage.setItem('userid', user.userId)
                    localStorage.setItem('admin',user.admin)
                    localStorage.setItem('username',user.username)
                    //affiche tous les posts
                    let path = `posts/all`;
                    navigate(path);
                }
            });
    }

    //fetch post. envoi email + password - retour admin(true/false signé), userId, token pour l'authentification, username
    async function connecterUser(email, password) {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        return await res.json();
    }
    
    return (
        <div className='gpm-signup'>
            <div className='gpm-label-input'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" id="email"  onKeyDown={entreeOnClick}></input>
            </div>
            <div className='gpm-label-input'>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" placeholder="Mot de passe" id="password" onKeyDown={entreeOnClick}></input>
            </div>
            <button  id='bouton' onClick={() => seConnecter()}>Se connecter</button>
        </div>
    )
}

export default Login
