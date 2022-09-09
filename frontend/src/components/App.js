
import Connexion from './Connexion'

function App() {
 //initialiser les variables lo
  localStorage.setItem('token', '');
  localStorage.setItem('userid', '');
  localStorage.setItem('admin', '');
  localStorage.setItem('username', '');
  
  return (
    <div className='connexion'><Connexion /></div>
  )
}

export default App
