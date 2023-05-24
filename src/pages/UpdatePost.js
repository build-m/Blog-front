import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios'
import { userContext } from '../context/UserContext';
import axios from 'axios';

export default function EditPost() {
       const navigate = useNavigate();
       const {user} = useContext(userContext)
       const [title, setTitle] = useState('')
       const [summary, setSummary] = useState('')
       const [content, setContent] = useState('')
       const [images, setImages] = useState('')
       const [author,setAuthor] = useState('')
       const {id} = useParams();
       
       
       const baseurl = 'https://surablogs.netlify.app'

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

    //useEffect fetches previous post values
    useEffect(()=>{
        const info = async () => {
            try {
              let result =  await axios.get(baseurl + `/post/${id}`)
              setAuthor(result.data.author._id)          
              setTitle(result.data.title)
              setSummary(result.data.summary)
              setContent(result.data.content)
            } catch (error) {
              console.log(error)
            }
          }
           info()
       },[])


    const updatePost = async (event) =>{
          event.preventDefault()
          const formData = new FormData();
          formData.set('title', title)
          formData.set('summary', summary)
          formData.set('content', content)
          // images?.[0] && formData.set('image', images?.[0])//if imagess[0] is not null
          formData.set('image', images[0])
          
          await Axios.put(baseurl + `/updatePost/${id}`,formData, { withCredentials: true } )
          .then(response => {
              console.log(response)
              navigate(`/post/${id}`) 
          })
          .catch(error => {
              console.log(error); 
          });
     }



 return (   
    <div>
      {user && user.id === author? (
   <>     <center><h2>Edit post</h2></center><br /><br />
        <form onSubmit={updatePost} style={{ alignItems: 'normal' }} >
            <input type="text" placeholder={'Title'} value={title} onChange={ev =>{setTitle(ev.target.value)}} maxLength="100" required/>
            <input type="text" placeholder={'Summary'} value={summary} onChange={ev =>{setSummary(ev.target.value)}} maxLength="450" required/>
            <input type="file" onChange={e=>setImages(e.target.files)} required/>
            <ReactQuill theme="snow" modules={modules} value={content} onChange={setContent}/>
            <div> 
          <button style={{marginTop:'95px', padding:'10px 30px', background:'#d6510e',cursor:'pointer'}}>Update</button>
            </div>          
        </form>
    </> ) : (navigate('/'))
    }
    </div>
  )
}
