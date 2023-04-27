import React from 'react'
import {format} from 'date-fns'
import {Link} from 'react-router-dom'

export default function Post(props) {
    const {post} = props //the name {post} should be the same as the prop sending name
    console.log(post)

  return (
   <div className="post">
         <div className="image">
            <Link to={`/post/${post._id}`}>
               <img src={post.image} alt="" /> {/*image has to be set in server.js path*/}
            </Link>          
         </div>       
         <div className="texts">
            <Link to={`/post/${post._id}`}>
                <h2>{post.title}</h2>
            </Link>
            <p className='info'>
              <a href='/' className='author'> {post.author.name} </a>
               <span>{format(new Date(post.createdAt), 'MMM d, yyyy, hh:mm')}</span>
               {/* if hh is capital/HH = will be 24hr format */}
               {/* another format is 'formatISO9075(new Date(post.createdAt))' lists numeral date */}
            </p>
            <p className='summary'>{post.summary}</p>
         </div>        
       </div> 
  )
}
