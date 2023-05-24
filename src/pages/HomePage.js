import React, { useContext, useEffect, useState } from 'react'
import Post from '../components/Post'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { userContext } from '../context/UserContext'

export default function HomePage() {
  const {user} = useContext(userContext)
  const [posts,setPosts] = useState([]) // should be empty array to receive result array
  const [author, setAuthor] = useState('') 
  
  const baseurl = 'https://gold-graceful-squid.cyclic.app'
  

  useEffect(()=>{
  const info = async () => {
    try {
    let result =  await Axios.get(baseurl + '/post')
    setPosts(result.data)
    if(user !== null){
    let author =  await Axios.get(baseurl + `/author/${user.id}`)
    setAuthor(author.data)
    }
    } catch (error) {
      console.log(error)
    }
  }
  info()
},[])


const welcome = () =>{
  window.alert('Welcome ' + author.name + ' ' + 'have a nice time!')
}


  return (
    <div className='pmain'>
      <div className='cvr-img'>
         <div>
          <h4> Become member of sura-blogs, share your ideas & get infinite premium journals </h4>
          {user ? ( <div><button> <Link to="/create"> Try it</Link></button></div>)
           : ( <div><button> <Link to="/login"> Try it</Link></button></div>)
          } 
         </div>
         <div>
         <img src="/images/blogger.gif" alt="" />
         </div>
      </div>
      {user && user.id === author._id ? (
        <div className='profile'>         
       <Link to='' onClick={welcome}> <div className='name'>{author.name}</div> </Link>
      </div>
      ) : ('') }
       

      <h3>All posts</h3>     
      {posts.length > 0 ? (posts.map(post => (
        <div key={post._id}>
          <Post post={post}/>
        </div>
      )))
      : (<center><h1>No posts yet...stay tuned</h1></center>)    
      }
      <hr />
      <div className='foot'>Made by 💚 &nbsp;<a href="https://t.me/s_Elyon7">surafel</a></div>
    </div>
  )
}
