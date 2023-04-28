import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios'
import { userContext } from '../context/UserContext';

export default function CreatePost() {
   const navigate = useNavigate();
   const {user} = useContext(userContext)
   const [title, setTitle] = useState('')
   const [summary, setSummary] = useState('')
   const [content, setContent] = useState('')
   const [images, setImages] = useState('')
   
   const baseurl = 'https://surablogs.onrender.com'

   const modules = { 
    toolbar:[
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"]
    ]
 }

const createPost = async (event) =>{
    event.preventDefault()
    const formData = new FormData();
    formData.set('title', title)
    formData.set('summary', summary)
    formData.set('content', content)
    formData.set('image', images[0])// means if u load many images,it picks the first one
    
    //if error occurs in axios set {headers:{ 'content-type': 'multipart/form-data' }} 
    // { withCredentials: true } sends saved cookies during login to the server
    await Axios.post(baseurl + '/createpost',formData, { withCredentials: true } )
    .then(response => {
        navigate('/') 
    })
    .catch(error => {
        console.log(error); 
    });
}


//u can put the react quill editor in another component & import it for simplicity. 
  return (   
    <div>
      {user? (
        <form onSubmit={createPost} style={{ alignItems: 'normal' }} >
            <input type="text" placeholder={'Title'} value={title} onChange={ev =>{setTitle(ev.target.value)}} maxLength="100" required/>
            <input type="text" placeholder={'Summary'} value={summary} onChange={ev =>{setSummary(ev.target.value)}} maxLength="450" required/>
            <input type="file" onChange={e=>setImages(e.target.files)} required/>
            <ReactQuill theme="snow" modules={modules} value={content} onChange={setContent}/>
            <div> 
          <button style={{marginTop:'95px', padding:'10px 30px', background:'#d6510e',cursor:'pointer'}}>Post</button>
            </div>          
        </form>
      ) : (navigate('/'))
    }
    </div>
  )
}
