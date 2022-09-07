import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"
import logo from '../assets/logo-noir.png'
import '../styles/Banner.css'


function Banner() {
    return (<div>
        <div className="gpm-banner">
            <img src={logo} alt='Logo de Groupomania' className='gpm-logo'/>
            <nav>
                <ul>
                    <li><Link to='/posts/all'><i class="fa-solid fa-address-card"></i></Link></li>
                    <li><Link to='/posts/new'><i class="fa-regular fa-square-plus"></i></Link></li>
                    <li><Link to='/'><i class="fa-solid fa-power-off"></i></Link></li>
                </ul>
            </nav>
        </div>
        <Outlet />
        
        </div>
    )
    
}

export default Banner