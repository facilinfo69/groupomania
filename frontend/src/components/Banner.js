import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"
import '../styles/Banner.css'


function Banner() {
    return (<div>
        <div className="gpm-banner">
            <div className="logo">test</div>
            {/* <img src={logo} alt='Logo de Groupomania' className='gpm-logo'/> */}
            <nav>
                <ul>
                    <li><Link to='/posts/all'>Voir tous les posts</Link></li>
                    <li><Link to='/posts/new'>Ajouter un post</Link></li>
                    <li><Link to='/posts/logout'>Se deconnecter</Link></li>
                </ul>
            </nav>
        </div>
        <Outlet />
        
        </div>
    )
    
}

export default Banner