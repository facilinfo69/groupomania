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
import Post from './components/Post';
import DeletePost from './components/DeletePost';

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>


    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='posts/' element={<Banner />} >
          <Route path=':postId' element={<Post />} />
          <Route path='all' element={<Posts />}  />        
          <Route path='new' element={<CreatePost />} />
          <Route path='modify-post/:postId' element={<CreatePost />} />
          <Route path='delete-post/:postId' element={<DeletePost />} />
          <Route path='logout' element={<App />}  />
        </Route>
        
        {/* <Route path='/' element={<App />} >
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route> */}
      </Routes>
    </BrowserRouter>



  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
