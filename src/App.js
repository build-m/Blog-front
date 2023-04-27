import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import {UserContextProvider} from './context/UserContext'
import CreatePost from './pages/CreatePost';
import SpecificPost from './pages/SpecificPost';
import UpdatePost from './pages/UpdatePost';


function App() {
  
  return (
    <UserContextProvider>
    <div className="main">
      <ToastContainer toastStyle={{ backgroundColor: "black", color:"white", button:"white" }} position='top-right' limit={1}/>
       <Helmet>
        <title>Sura-blogs</title>
        <link rel="icon" href="./images/logo.png" />
       </Helmet>

      <Router>
        <Routes>
            <Route path='/' element={<Layout/>}>
                  <Route path='/' element={<HomePage/>}/>
                  <Route path='/login' element={<LoginPage/>} />
                  <Route path='/create' element={<CreatePost/>} />
                  <Route path='/post/:id' element={<SpecificPost/>} />
                  <Route path='/edit/:id' element={<UpdatePost/>}></Route>
            </Route>          
        </Routes>
      </Router>      
    </div>
    </UserContextProvider>
  );
}

export default App;