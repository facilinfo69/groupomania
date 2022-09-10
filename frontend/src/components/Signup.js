import { useState } from 'react';
import '../styles/Signup.css'


function Signup({ setAuthMode }) {
    let [reponseApi, setreponseApi] = useState(null);
    //variables pour controler les inputs
    let str, email, user, msgUser, msgEmail, msgChiffre, msgMaj, msgMin, msgCarSpe, msgLg;
    let mdpvalidation, emailvalidation, uservalidation;
 
    //controle de l'input username obligatoie et plus de 3 caractères
    const verifierUsername = (event) => {
        //simule le click validation
        if (event.key === 'Enter') { document.getElementById('btn-inscrire').click() };
        
        user = document.getElementById("username").value;
        if (user.length >= 3) {
            msgUser = "";
            document.getElementById("msgUser").innerHTML = msgUser;
            uservalidation = true;
        } else {
            msgUser = "<p style='color:red'>Le nom de l'utilisateur est obligatoire (min 3 caractères)</p>";
            document.getElementById("msgUser").innerHTML = msgUser;
            uservalidation = false;
        }
    }

    //controle de l'input mail obligatoie
    const verifierEmail = (event) => {
        if (event.key === 'Enter') { document.getElementById('btn-inscrire').click() };

        email = document.getElementById("email").value;
        if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            msgEmail = "<p style='color:green'>Format email valide</p>";
            document.getElementById("msgEmail").innerHTML = msgEmail;
            emailvalidation = true;
        } else {
            msgEmail = "<p style='color:red'>Format email invalide</p>";
            document.getElementById("msgEmail").innerHTML = msgEmail;
            emailvalidation = false;
        }
    }



     //controle de l'input Mot de passe obligatoie : au moins 2 chiffres, une majuscule, une minuscule, un caractère spécial et 8 caractères
    const verifMotdePasse = (event) => {
        if (event.key === 'Enter') { document.getElementById('btn-inscrire').click() };

        str = document.getElementById("password").value;
        if (str.match(/(?=(.*\d){2})/g)) {
            msgChiffre = "<p style='color:green'>Au moins deux chiffres.</p>";
            document.getElementById("msgChiffre").innerHTML = msgChiffre;
        } else {
            msgChiffre = "<p style='color:red'>Au moins deux chiffres.</p>";
            document.getElementById("msgChiffre").innerHTML = msgChiffre;
        }

        if (str.match(/[A-Z]/g)) {
            msgMaj = "<p style='color:green'>Au moins une majuscule.</p>";
            document.getElementById("msgMaj").innerHTML = msgMaj;
        } else {
            msgMaj = "<p style='color:red'>Au moins une majuscule.</p>";
            document.getElementById("msgMaj").innerHTML = msgMaj;
        }

        if (str.match(/[a-z]/g)) {
            msgMin = "<p style='color:green'>Au moins une minuscule.</p>";
            document.getElementById("msgMin").innerHTML = msgMin;
        } else {
            msgMin = "<p style='color:red'>Au moins une minuscule.</p>";
            document.getElementById("msgMin").innerHTML = msgMin;
        }

        if (str.match(/[^a-zA-Z\d]/g)) {
            msgCarSpe = "<p style='color:green'>Au moins un caractère spécial.</p>";
            document.getElementById("msgCarSpe").innerHTML = msgCarSpe;
        } else {
            msgCarSpe = "<p style='color:red'>Au moins un caractère spécial.</p>";
            document.getElementById("msgCarSpe").innerHTML = msgCarSpe;
        }

        if (str.length >= 8) {
            msgLg = "<p style='color:green'>Au moins 8 caractères.</p>";
            document.getElementById("msgLg").innerHTML = msgLg;
        } else {
            msgLg = "<p style='color:red'>Au moins 8 caractères.</p>";
            document.getElementById("msgLg").innerHTML = msgLg;
        }


        if (str.match(/(?=(.*\d){2})/g) &&
            str.match(/[A-Z]/g) &&
            str.match(/[a-z]/g) &&
            str.match(/[^a-zA-Z\d]/g) &&
            str.length >= 8)
            mdpvalidation = true;
        else
        mdpvalidation = false;
    }

    //si les 3 champs input bien renseigné, function inscrireUser
    const verifierInscription = (event) => {
        console.log('mdp', mdpvalidation, "email", emailvalidation,'user',uservalidation);
        if (mdpvalidation && emailvalidation && uservalidation) {
            inscrireUser(document.getElementById('username').value, document.getElementById('email').value, document.getElementById('password').value);
        }
    }

    return reponseApi !== 201 || reponseApi == null ? (
        <div className='gpm-signup'>
            <div className='gpm-label-input'>
                <label htmlFor="username">Nom de l'utilisateur</label>
                <input type="email" placeholder="Nom de l'utilisateur" id="username" onKeyUp={verifierUsername}></input>
                <div className='validation'>
                    <p id='msgUser'></p>
                </div>
            </div>
            <div className='gpm-label-input'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" id="email" onKeyUp={verifierEmail}></input>
                <div className='validation'>
                    <p id='msgEmail'></p>
                </div>

            </div>
            <div className='gpm-label-input'>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" placeholder="Mot de passe" id="password" onKeyUp={verifMotdePasse}></input>
                <div className='validation'>
                    <p id='msgChiffre'></p>
                    <p id='msgMaj'></p>
                    <p id='msgMin'></p>
                    <p id='msgCarSpe'></p>
                    <p id='msgLg'></p>
                    <p id='msg'></p>
                </div>



            </div>
            {reponseApi != null ? <div className='gpm-message'>Vérifiez les données saisies !</div> : null}
            <button id='btn-inscrire' onClick={verifierInscription}>S'inscrire</button>
        </div>) : null
    // ) : (

    //     // <div>{setAuthMode('signinok')}
    //     // </div>
    // )

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
                    setAuthMode('signupok');
                    return res.json();
                } else {
                    setreponseApi(res.status);
                }
            })
    }
}





export default Signup
