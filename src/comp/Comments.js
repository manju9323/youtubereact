import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import Comment from "./Comment.js"
import axios from 'axios';
import { useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';



const Container=styled.div`
`;

const NewComment=styled.div`
display: flex;
align-items: center;
gap: 10px;
`;

const Avatar=styled.img`
height: 40px;
border-radius:50%;
width: 40px;
`;

const Input=styled.input`
border:none;
border-bottom: 1px solid ${({theme})=>theme.textSoft};
color:${({theme})=>theme.text};
background-color:transparent;
outline:none;
padding:5px;
width:100%;
`;




function Comments({videoId}) {
  const {currentUser} = useSelector(state=>state.user);
  const[comments,setComments]=useState([]);
  const[newcomment,setnewComment]=useState("");

  const fetchComments=async()=>{
    try{
      const res=await axios.get(`https://youtubenode.onrender.com/api/comments/${videoId}`);
      setComments(res.data)
    }
    catch(err){
    }
  }

   useEffect(()=>{
    fetchComments();
   },[videoId])

const send=async()=>{
  try{
    const res=await axios.post("https://youtubenode.onrender.com/api/comments",{videoId,desc:newcomment},{headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}});
     setnewComment("")
    fetchComments();
  }
  catch(err){
  }
}




  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img}/>
        <Input type="text" placeholder='Add a comment...' value={newcomment} onChange={(e)=>{setnewComment(e.target.value)}}/>
        <SendIcon onClick={send} />
      </NewComment>
      {comments.map((comment)=>
             <Comment key={comment._id} func={fetchComments} comment={comment}/>
      )}
      
    </Container>
  )
}

export default Comments