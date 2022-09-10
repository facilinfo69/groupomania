import '../styles/Connexion.css'
import logo from '../assets/logo-noir.png'
import Signup from './Signup';
import Login from './Login';
import { useState } from 'react';

export default function Connexion() {

    //3 possibilités :
    // - par defaut signin page de login qui s'affiche
    // - signup page d'inscription 
    // - signupok retour d'inscription réussie donc afficher 'votre compte est créé'

    let [authMode, setAuthMode] = useState('signin')

    const changeAuthMode = () => {
        setAuthMode(authMode === 'signin' ? 'signup' : 'signin')
    }

    if (authMode === 'signin' || authMode === 'signupok') {
        if (authMode === 'signin') {
            return (<>
                <img src={logo} alt='Logo de Groupomania' className='gpm-logo' />
                <div className='form'>
                    <div className="gpm-connexion">
                        <h2>Bienvenue !</h2>
                        <div className='gpm-inscrit'>
                            <p>Vous n'avez pas de compte !</p>
                            <span onClick={changeAuthMode}>S'inscrire</span>
                        </div>
                        <Login />
                    </div>
                </div>
            </>
            )
        } else {
            return (
                <div className='form'>
                    <div className="gpm-connexion">
                        <h2>Bienvenue !</h2>
                        <div className='gpm-inscrit'>
                            <p>Votre compte est créé ! Vous pouvez vous connecter</p>
                        </div>
                        <Login />
                    </div>
                </div>
            )
        }

    } else {
        return (
            <div className='form'>
                <div className="gpm-connexion">
                    <h2>Bienvenue !</h2>
                    <div className='gpm-inscrit'>
                        <p>Vous avez un compte !</p>
                        <span onClick={changeAuthMode}>Se connecter</span>
                    </div>
                    <Signup setAuthMode={setAuthMode} />
                </div>
            </div>
        )
    }
}
