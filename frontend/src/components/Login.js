import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'

function Login() {
    let navigate = useNavigate();

    const routeChange = () => {
        let reponse = connecterUser(document.getElementById('email').value, document.getElementById('password').value);
        reponse
            .then(function (user) {
                if (user.token == null) {
                    alert(user.message);
                } else {
                    localStorage.setItem('token', user.token)
                    let path = `posts/all`;
                    navigate(path);
                }
            });
    }

    function connecterUser(email, password) {
        return fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
            .then(function (res) {
                return res.json();
            })
    }

    return (
        <div className='gpm-signup'>
            <div className='gpm-label-input'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" id="email"></input>
            </div>
            <div className='gpm-label-input'>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" placeholder="Mot de passe" id="password"></input>
            </div>
            <button onClick={() => routeChange()}>Se connecter</button>
        </div>
    )
}

export default Login
