//import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../firebase"
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Container=styled.div`
width:100%;
height: 100%;
position:absolute !important;
top:0;
left:0;
background-color:#000000a7;
display:flex;
align-items:center;
justify-content:center;
z-index:1000;
`

const Wrapper=styled.div`
width: 600px;
height: 600px;
background-color:${({theme})=>theme.bgLighter};
color:${({theme})=>theme.text};
padding: 20px;
display: flex;
flex-direction:column;
gap: 20px;position:relative;

`
const Close=styled.div`
position:absolute;
top: 10px;
right: 10px;
cursor:pointer;
`
const Title=styled.h1`
text-align:center`

const Input=styled.input`
bottom: 1px solid ${({theme})=>theme.soft};
color: ${({theme})=>theme.text};
border-radius:3px;
padding:10px;
background-color:transparent;
`
const Desc=styled.textarea`
bottom: 1px solid ${({theme})=>theme.soft};
color: ${({theme})=>theme.text};
border-radius:3px;
padding:10px;
background-color:transparent;
`
const Button=styled.button`
 border-radius:3px;
 border:none;
 padding:10px 20px;
 font-weight:500;
 cursor: pointer;
 background-color:${({theme})=>theme.soft};
 color:${({theme})=>theme.textSoft}
`

const Label=styled.label`
font-size:14px;
`

function Upload({setOpen}) {
  const[video,setVideo]=useState(undefined)
 const[image,setImage]=useState(undefined)
 const[videoper,setVideoper]=useState(0)
 const[imgper,setImageper]=useState(0)
 const[inputs,setInputs]=useState({})
 const[tags,setTags]=useState([])
 const navigate = useNavigate()

 
 const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

 const handleTags=(e)=>{
  setTags(e.target.value.split(","))
 }
const uploadFile=(file,urlType)=>{
  const storage = getStorage(app);
  const fileName=new Date().getTime()+file.name;
  const storageRef = ref(storage,fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === "imgUrl" ? setImageper(Math.round(progress)) : setVideoper(Math.round(progress));
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
        break;

    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  },
  () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
);
}

useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  useEffect(() => {
    image && uploadFile(image, "imgUrl");
  }, [image]);

  const handleUpload = async(e)=>{
    e.preventDefault();
    const res = await axios.post("https://youtubenode.onrender.com/api/videos", {...inputs, tags},
     {headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
    setOpen(false)
    console.log(...inputs,tags)
    res.status===200 && navigate(`/video/${res.data._id}`)
  }


  return (
    <Container>
       <Wrapper>
        <Close onClick={()=>setOpen(false)}>X</Close>
        <Title>Upload a New video</Title>
         <Label>Video:</Label>

       {videoper>0? ("uploading"+videoper+"%"):
       (<Input type="file" accept="video/*"
        onChange={(e)=>setVideo(e.target.files[0])}/>)}

         <Input type="text" placeholder='Title' name="title" onChange={handleChange}/>

         <Desc placeholder='Descrption' rows={8} name="desc" onChange={handleChange}/>

         <Input type="text" placeholder='Sepeerate tags with coommas.' onChange={handleTags}/>

         <Label>Image:</Label>
         {imgper>0? ("uploading"+imgper+"%"):
         (<Input type="file" accept='image/*' onChange={(e)=>setImage(e.target.files[0])}/>)}
         <Button onClick={handleUpload}>Upload</Button>
       </Wrapper>

    </Container>
  )
}

export default Upload;