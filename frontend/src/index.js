import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './styles/index.css';
import App from './components/App';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
import Banner from './components/Banner';
import DeletePost from './components/DeletePost';
import Logout from './components/Logout';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} /> {/*route pour la connexion */}
        <Route path='posts/' element={<Banner />} > {/*route parent avec le banner*/}
          <Route path='all' element={<Posts />}  />  {/*route qui affiche tous les posts*/}      
          <Route path='new' element={<CreatePost />} />{/*route pour créer un nouveau post */}
          <Route path='modify-post/:postId' element={<CreatePost />} /> {/*route pour modifier un post */}
          <Route path='delete-post/:postId' element={<DeletePost />} />  {/*route pour supprimer un post */}
        </Route>
        <Route path='logout' element={<Logout />}  /> {/*route pour se deconnecter */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
