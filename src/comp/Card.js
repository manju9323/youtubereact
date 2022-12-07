import React, { useEffect, useState } from 'react'
import {Link}from "react-router-dom"
import styled from '@emotion/styled'
import {format} from "timeago.js";
import axios from 'axios';


const Container = styled.div`
width: ${(props)=>props.type !== "sm" && "250px" };
margin-bottom:${(props)=>props.type === "sm" ? "10px":"45px" };
cursor: pointer;
display:${(props)=>props.type === "sm" && "flex" };
gap:25px;
`;

const Image=styled.img`
width:100%;
height:${(props)=>props.type === "sm" ? "100px" : "150px" };
border-radius:9px;
background-color: #999;
flex:1;
`
const Details=styled.div`
flex:1;
display:flex;
margin-top:${(props)=>props.type === "sm" ? "0px" : "10px" };
gap:12px;
`
const Channelimg=styled.img`
width:36px;
height:36px;
border-radius:50%;
background-color:#999;
display:${(props)=>props.type === "sm" && "none" };
`
const Texts=styled.div`
`
const Title=styled.div`
font-size: 16px;
font-weight:600;
letter-spacing:.3px;
color:${({theme})=>theme.text}
`
const Channelname=styled.div`
font-size:14px;
font-weight:500;
color:${({theme})=>theme.textSoft};
margin:10px 0px;
&:hover{
  font-weight:bolder;
}
`

const Info=styled.div`
font-size:12px;
font-weight: 500;
margin-top:-3px;
color:${({theme})=>theme.textSoft};
`


function Card({type,video}) {
   
  

  const [channel,setChannel]=useState({});
  useEffect(()=>{
   
    const fetchChannel = async()=>{

       const res= await axios.get(`http://localhost:8000/api/users/find/${video.userId}`
       );
       console.log("reeeee",res.data)
       await setChannel(res.data)
      
  }
  fetchChannel()
},[video.userId])

  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
    <Container type={type}>
        <Image type={type} src={video?.imgUrl} />
        <Details type={type}>
            <Channelimg type={type} src={channel?.img}/>
            <Texts>
                <Title>{video.title}</Title>
                <Link to={`/Channel/${channel._id}`} style={{textDecoration:"none"}}>
                        <Channelname>{channel.name}</Channelname>
                </Link>
                <Info>{video.views} views {format(video.createdAt)}</Info>
            </Texts>
        </Details>
    </Container>
    </Link>
   )}

export default Card