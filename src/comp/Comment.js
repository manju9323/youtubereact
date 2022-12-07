import styled from '@emotion/styled'
import axios from 'axios';
import { format } from 'timeago.js';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast} from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';




const Del=styled.div`
font-size:14px;
border-radius:3px;
border:1px solid ${({theme})=>theme.text};
color:${({theme})=>theme.textSoft};
margin:10px 0px;
right:-30px;
top:10px;
cursor: pointer;
position:absolute;
`

const Container=styled.div`
position: relative;
display: flex;
gap: 10px;
margin: 30px 0px;
justify-content:space-between;
`
const Avatar=styled.img`
flex:0.3;
height: 40px;
border-radius:50%;
width: 40px;
`;
const Icon=styled.div`
top:0px;
cursor: pointer;
`;

const Details=styled.div`
display: flex;
flex:6;
flex-direction:column;
gap: 10px;
color:${({theme})=>theme.text};
`
const Name = styled.span`
font-size:13px;
font-weight: 500;`

const Date = styled.span`
font-size:12px;
font-weight: 400;
color:${({theme})=>theme.textSoft};
margin-left: 5px;
`

const Text = styled.span`
font-size: 14px;`


function Comment({comment,func}) {
  const navigate=useNavigate();
  const {currentVideo} = useSelector(state=>state.video);
  const [open,setOpen]=useState(false);
  const [channel,setChannel]=useState({});
  const {currentUser} = useSelector(state=>state.user);
  

  useEffect(()=>{
    const fetchComment=async()=>{
      const res=await axios.get(`http://localhost:8000/api/users/find/${comment.userId}`)
      setChannel(res.data)};
    fetchComment()
  },[comment.userId])

  const  del=async(e)=>{
    await axios.delete(`http://localhost:8000/api/comments/${comment._id}`,{headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
      .then( res=>{toast.success('successful deleted', {autoClose:3000})
       func()
   })
   .catch(err=>{toast.error(err.response.data.message)
  })
   }

  return (
   <>
    {!channel && <div>no comments</div>}
    {channel && <div>
    <Container>
      <Avatar src={channel.img}/>
      <Details><Name>{channel.name}<Date>{format(comment.createdAt)}</Date></Name>
      <Text>{comment.desc}</Text>
      </Details>
   
        
        {currentUser._id===comment.userId  ?<Icon>
         <MoreVertIcon onClick={()=>{setOpen(!open)}}/>
        {open &&  <Del><DeleteIcon onClick={del}>Delete comment</DeleteIcon></Del>}
      </Icon>:<abbr title="no permit to delete"><MoreVertIcon/></abbr>
          }
        
      
      
    </Container>
    </div>}
    </> 
  )
}

export default Comment