import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom' 
import { MdLogin } from 'react-icons/md' 
import { FaPowerOff } from 'react-icons/fa'
import { IoCreateSharp } from 'react-icons/io5'
import { userContext } from '../context/UserContext';


export default function Header() {
  const {user,setUser} = useContext(userContext)
  
  const baseurl = 'https://gold-graceful-squid.cyclic.app'



const logout = async () =>{
 await Axios.post(baseurl + '/logout',{withCredentials: true})
 setUser(null)
 localStorage.removeItem('userInfo')
}


// console.log("from context "+ JSON.stringify(user))

  return (
   <header>
         <Link to="/" className='logo'> <img className='header-logo' src={"/images/logo.png"} alt="" /></Link>
         <nav>
          {user ? (
            <div className='crp'>
            <Link to='/create' title='Create a post'> <IoCreateSharp size={30}/> </Link>
            <a title='Log out' onClick={logout}><FaPowerOff size={25}/></a>
            </div>
          )
           : (
            <div>
            <Link to="/login"><MdLogin size={30}/></Link>
            </div>
          )}
         </nav>
      </header> 
  )
}
