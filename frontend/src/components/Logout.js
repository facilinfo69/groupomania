
// import Connexion from './Connexion'
import { useNavigate } from 'react-router-dom';

function Logout() {
  localStorage.setItem('token', '');
  localStorage.setItem('userid', '');
  
  let navigate = useNavigate();
  let path = `../`;
  navigate(path);
}

export default Logout