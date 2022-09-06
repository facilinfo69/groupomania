import '../styles/Connexion.css'
import Signup from './Signup';
import Login from './Login';
import { useState } from 'react';

export default function Connexion() {
    
    let [authMode, setAuthMode] = useState('signin')

    const changeAuthMode = () => {
        setAuthMode(authMode === 'signin' ? 'signup' : 'signin')
    }
    
    console.log(authMode);
    if (authMode === 'signin' || authMode === 'signinok') {
        if(authMode === 'signin') {
            return (
                <div className='form'>
                    <div className="gpm-connexion">
                        <h2>Bienvenue !</h2>
                        <div className='gpm-inscrit'>
                            <p>Pas encore inscrit !</p>
                            <span onClick={changeAuthMode}>S'inscrire</span>
                        </div>  
                        <Login />
                    </div>
                </div>
            )
        } else {
            return (
                <div className='form'>
                    <div className="gpm-connexion">
                        <h2>Bienvenue !</h2>
                        <div className='gpm-inscrit'>
                            <p>Inscrition ok vous pouvez vous loguer</p>
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
                    <p>Déjà inscrit !</p>
                    <span onClick={changeAuthMode}>Se connecter</span>
                    </div>
                     <Signup authMode={authMode} setAuthMode={setAuthMode} />
                 </div>
             </div>
        )
    }

}
// function Banner() {
//     return (
//         <div className='form'>
//             <div className="gpm-banner">
//                 {/* <img src={logo} alt='Logo de Groupomania' className='gpm-logo'/> */}
//                 <nav>
//                     <ul>
//                         <li><Link to='/login'>Se connecter</Link></li>
//                         <li><Link to='/signup'>S'inscrire</Link></li>
//                     </ul>
//                 </nav>
                
//                 <Outlet />
//             </div>
//         </div>

//     )
// }

// export default Banner