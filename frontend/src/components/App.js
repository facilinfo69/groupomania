
import Connexion from './Connexion'

function App() {
  console.log("affichage app");
  localStorage.setItem('token', '');
  
  return (
    <div className='connexion'><Connexion /></div>
    
  )
}

export default App
