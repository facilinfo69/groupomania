import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"
import logo from '../assets/logo-noir.png'
import '../styles/Banner.css'


function Banner() {
    return (<>
        <div id='banner' className="gpm-banner">
            <img src={logo} alt='Logo de Groupomania' className='gpm-logo'/>
            <nav>
                <ul>
                    <li><Link to='/posts/all'><i className="fa-solid fa-address-card" title="afficher tous les posts"></i></Link></li>
                    <li><Link to='/posts/new'><i className="fa-regular fa-square-plus" title="ajouter un post"></i></Link></li>
                    <li><Link to='/'><i className="fa-solid fa-power-off" title="se déconnecter"></i></Link><span className="username">{localStorage.getItem('username')}</span></li>
                </ul>
            </nav>
        </div>
        <Outlet />
        
        </>
    )
    
}

export default Banner