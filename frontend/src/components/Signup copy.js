import '../styles/Signup.css'

function Signup() {
    return (
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

            <button onClick={() => inscrireUser(document.getElementById('username').value,document.getElementById('email').value, document.getElementById('password').value)}>S'inscrire</button>

        </div>

    )
}



function inscrireUser(username,email, password) {
    return fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username,email, password })
    })
        .then(function (res) {
            if (res.ok) {

                return res.json();

            }
        })
        .then(function (value) {
            return (value);
        });


}

export default Signup
