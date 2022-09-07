
import Connexion from './Connexion'

function App() {
  console.log("affichage app");
  localStorage.setItem('token', '');
  localStorage.setItem('userid', '');
  localStorage.setItem('admin', '');
  
  return (
    <div className='connexion'><Connexion /></div>
    
  )
}

export default App
