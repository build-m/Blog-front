import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {format} from 'date-fns'
import { userContext } from '../context/UserContext';
import {BiPencil} from 'react-icons/bi'
import {AiOutlineDelete} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
// import { confirm } from "react-confirm-box";

export default function SpecificPost() {
       const navigate = useNavigate();
       const {user} = useContext(userContext)
       const [post,setPost] = useState('')
       const {id} = useParams();
       
       const baseurl = 'https://gold-graceful-squid.cyclic.app'


       useEffect(()=>{
        const info = async () => {
            try {
              let result =  await axios.get(baseurl + `/post/${id}`) 
              console.log(user)         
              setPost(result.data)
            } catch (error) {
              console.log(error)
            }
          }
           info() 
       },[])

// console.log(post)
// console.log(user.id)
// console.log(post.author)

const delConfirm = async () => {
   const result = window.confirm("Are you sure you want to delete");
   if (result) {
    await axios.delete(baseurl + `/delete/${id}`, { withCredentials: true })
    navigate('/') 
    console.log("You click yes!");
     return;
   }
   console.log("You click No!");
 };


  return (
    
    <div className='postuniq'>
       {!post ? 
       (
        <div><center><h2> No posts yet. . .</h2></center></div>
       ) 
       :
       ( 
  <>
        <div className='author'>
          <div className='title'>{post.title}</div> 
          <div className='inf'> By &nbsp;{post.author.name}, &nbsp;&nbsp;
           <span>{format(new Date(post.createdAt), 'MMM d, yyyy, hh:mm')}</span>
          </div> 

           {user && user.id === post.author._id &&
           <div className='btn'>
              <Link to={`/edit/${post._id}`}>Edit &nbsp;<BiPencil size={18}/> </Link> &nbsp; &nbsp;
              <Link to='' onClick={delConfirm} className='delete'>Delete &nbsp;<AiOutlineDelete size={19}/></Link>
              <br />
            </div> 
             }
        </div>
        
        <div className='coverimg'>
          {/* <img src={`http://localhost:5000/${post.image}`} alt="" /> */}
          <img src={'/'+ post.image} alt="" />
        </div>
        <div className='txt-content' dangerouslySetInnerHTML={{__html:post.content}}></div>
  </>
       )
    }
    </div>
  )
}
