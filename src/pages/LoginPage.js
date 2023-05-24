import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import "./style.css";
import { toast } from 'react-toastify';
import { userContext } from '../context/UserContext';

export default function LoginPage() {
   const navigate = useNavigate();
   const [activate, setActivate] = useState(false)
   const [logEmail, setLogEmail] = useState('')
   const [logPass, setLogPass] = useState('')
   const [regName, setRegName] = useState('')
   const [regEmail, setRegEmail] = useState('')
   const [regPass, setRegPass] = useState('')

   const {setUser} = useContext(userContext)
   
   const baseurl = 'https://gold-graceful-squid.cyclic.app'


   //REGISTER
   const register = async (e)=>{ 
       e.preventDefault();
       try {
		
		 await Axios.post(baseurl + '/register', {
	     name:regName,
             email:regEmail,
             password:regPass
      });
	  toast.success("Successfully registered!")
	   } catch (error) {
		toast.error('Invalid email or password-make it unique');
	   }
   }

   //LOGIN
   const login = async (e) =>{
     e.preventDefault();
	 try {		
		const { data } = await Axios.post(baseurl + '/login', {
             email:logEmail,
             password:logPass 
      }, { withCredentials: true }); //this sends saved cookies in the browser to the server 
	  toast.success("Successfully logged in!")
    //   setUser(data.email)
	  setUser(data)
	  localStorage.setItem('userInfo', JSON.stringify(data))
	  navigate('/')
	 } catch (error) {
		toast.error('Invalid email or password');
	 }
   }



  return (
    <div className={activate ? 'container right-panel-active' : 'container'}>
      
      <div className="form-container sign-up-container">
		 <form onSubmit={register}>
		 	<h1>Create Account</h1>
		 	<input 
			   type="text" 
			   placeholder="Name" 
			   value={regName} 
			   onChange={event => setRegName(event.target.value)} required/>
		 	<input 
			   type="email" 
			   placeholder="Email" 
			   value={regEmail}
			   onChange={event => setRegEmail(event.target.value)} required/>
		 	<input 
			   type="password" 
			   placeholder="Password" 
			   value={regPass}
			   onChange={event => setRegPass(event.target.value)} required/>
		 	<button className="log">Sign Up</button>
		 </form>
	  </div>

      <div className="form-container sign-in-container">
		        <form onSubmit={login}>
		        	<h1>Sign in</h1>
		        	<input 
					  type="email" 
					  placeholder="Email" 
					  value={logEmail}
			          onChange={event => setLogEmail(event.target.value)} required/>
		        	<input 
					  type="password" 
					  placeholder="Password" 
					  value={logPass}
			          onChange={event => setLogPass(event.target.value)} required/>
		        	<button className="log">Sign In</button>
		        </form>
	    </div>

      <div className="overlay-container">
		    <div className="overlay">
			      <div className="overlay-panel overlay-left">
              <img className='su-logo' src="./images/logo.png" alt="" />
			      	<h1>Welcome Back!</h1>
			      	<p className='pr'>To share ideas with your audience please login with your personal info</p>
			      	<button className="ghost" id="signIn" onClick={()=>setActivate(!activate)}>Sign In</button>
			      </div>
			      <div className="overlay-panel overlay-right">
              <img className='su-logo' src="./images/logo.png" alt="" />
			      	<h1>Holla, Blogger!</h1>
			      	<p className='pr'>Enter your personal details to log & share what's on your mind</p>
			      	<button className="ghost" id="signUp" onClick={()=>setActivate(!activate)}>Sign Up</button>
			      </div>
		    </div>
	  </div> 

    </div>
  )
}
