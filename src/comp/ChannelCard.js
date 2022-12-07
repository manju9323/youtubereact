
import {Link,useNavigate}from "react-router-dom"
import styled from '@emotion/styled'
import {format} from "timeago.js";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React,{ useState } from "react";
import axios from "axios";
import { toast} from 'react-toastify';
import { useSelector } from "react-redux";



const Container = styled.div`
width: ${(props)=>props.type !== "sm" && "300px" };
margin-bottom:${(props)=>props.type === "sm" ? "10px":"45px" };
cursor: pointer;
display:${(props)=>props.type === "sm" && "flex" };
gap:10px;
`;

const Image=styled.img`
width:100%;
height:${(props)=>props.type === "sm" ? "100px" : "150px" };
border-radius:7px;
background-color: #999;
flex:1;
`
const Details=styled.div`
flex:1;
display:flex;
justify-content:space-between;
margin-top:${(props)=>props.type === "sm" ? "0px" : "10px" };
gap:12px;
background-color: ${({theme})=>theme.bg};
color:${({theme})=>theme.text}
`

const Texts=styled.div`

`
const Points=styled.div`
`
const Title=styled.div`
font-size: 16px;
font-weight: 500;
color:${({theme})=>theme.text}
`


const Info=styled.div`
font-size:14px;
color:${({theme})=>theme.textSoft};
margin:10px 0px;
`

const Del=styled.div`
font-size:14px;
border-radius:3px;
border:1px solid ${({theme})=>theme.text};
color:${({theme})=>theme.textSoft};
margin:10px 0px;
`

function ChannelCard({type,video}) {
    const navigate=useNavigate();
   const {currentChannelvisit}=useSelector(state=>state.channel)
   const [open,setOpen]=useState(false)
 

   const  del=async(e)=>{
      console.log(video._id)
      await axios.delete(`http://localhost:8000/api/videos/${video._id}`,{headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
        .then( res=>{toast.success('successful deleted', {autoClose:3000})
        navigate(`/channel/${currentChannelvisit}`)
     })
     .catch(err=>{toast.error(err.response.data.message)
    })
     }


  return (
    <>
    
    <Container type={type}>
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
        <Image type={type} src={video?.imgUrl}/>
        </Link>
       
        <Details type={type}>
        <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
            <Texts>
                <Title>{video.title}</Title>
                <Info>{video.views} views {format(video.createdAt)}</Info>
            </Texts>
        </Link>   
            <Points>
            <MoreVertIcon onClick={()=>{setOpen(!open)}}/>
              {open && <Del onClick={del}>Delete video</Del>}
        </Points>
        </Details>
       
    </Container>
      
            </>
   )}

export default ChannelCard