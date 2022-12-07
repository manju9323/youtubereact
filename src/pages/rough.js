import React, { useEffect, useState } from 'react';
//import Card from '../comp/Card';
import styled from '@emotion/styled';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Comments from '../comp/Comments';
import { useSelector,useDispatch } from 'react-redux';
//import {fetchStart,fetchSucess,fetchFailure} from '../redux/videoSlice';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchSucess,like,dislike } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../redux/userSlice';
import Recommendation from '../comp/Recommendation';
//import { Card } from '@mui/material';

const Container=styled.div`
display:flex;
gap:24px;
position:relative;
`;
const Content=styled.div`
flex:5;

`;
const Videowrapper=styled.div`

`;
const Title=styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 20px;
color:${({theme})=>theme.text}
`;
const Detail=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
`;
const Info=styled.span`
color:${({theme})=>theme.textSoft};
display:flex;
gap:20px;
color:${({theme})=>theme.text}
`;
const Buttons=styled.div`
display:flex;
gap:20px;
color: ${({ theme }) => theme.text};
`;
const ButtonIn=styled.div`
display:flex;
align-items:center;
gap:5px;
cursor: pointer;
border:none;
`;



const Hr=styled.hr`
margin:15px 0px;
border: 0.5px solid ${({theme})=>theme.soft};
`;
const Channel=styled.div`
display:flex;
justify-content:space-between;

`
const ChannelInfo=styled.div`
display: flex;
gap:20px;`

const Image=styled.img`
height: 40px;
border-radius:50%;
width: 40px;`

const ChannelDetail=styled.div`display:flex;
flex-direction:column;
color:${({theme})=>theme.text}`

const ChannelCounter=styled.span`
margin-top: 5px;
margin-bottom: 20px;`

const ChannelName=styled.span`
font-weight: 500;
color:${({theme})=>theme.text};
font-size: 16px;
:hover{
  font-weight:bolder;
}
`
const Description=styled.p`
font-size: 15px;
word-break: break-all;
`

const Subscribe=styled.button`
background-color:#cc1a00;
font-weight: 500;
color:white;
border: none;
border-radius:3px;
height:max-content;
padding:10px 20px;
cursor: pointer;
`
const VideoFrame=styled.video`
background-size:cover;
max-height:720px;
width: 100%;
border:none;
object-fit:cover;
`

function Videos() {
  const {currentUser} = useSelector(state=>state.user);
  const {currentVideo} = useSelector(state=>state.video);

  const dispatch = useDispatch();
  const path =useParams().id
 // const path =useParams().pathname.split("/")[2]
  const [channel,setChannel]=useState({})
 // const [views,setViews]=useState(0)
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const videoRes=await axios.get(`http://localhost:8000/api/videos/find/${path}/${currentUser? currentUser._id : "nouser"}`
        )
        const channelRes=await axios.get(`http://localhost:8000/api/users/find/${videoRes.data.userId}`
        )
        //console.log(channelRes.data)
        setChannel(channelRes.data)
         
        dispatch(fetchSucess(videoRes.data))
      }
      catch(err){

      }
    }
    fetchData()
  },[path,dispatch])

 
  const handelLike= async()=>{
    
     await axios.put(`http://localhost:8000/api/users/like/${currentVideo._id}`,{data:"mm"},
     {headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
     dispatch(like(currentUser._id))
  }
  const handelDislike=async()=>{
    await axios.put(`http://localhost:8000/api/users/dislike/${currentVideo._id}`,{data:"mm"},
    {headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
    dispatch(dislike(currentUser._id))
  }

  const handelSub=async()=>{
     currentUser.SubscribedUsers.includes(channel._id)
        ? await axios.put(`http://localhost:8000/api/users/unsub/${channel._id}`,{data:"mm"},
          {headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
        : await axios.put(`http://localhost:8000/api/users/sub/${channel._id}`,{data:"mm"},
          {headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
     dispatch(subscription(channel._id))
  }

  return (
    <Container>
    <Content>
        <Videowrapper>
        <VideoFrame src={currentVideo?.videoUrl} controls/>

        </Videowrapper>
        <Title>{currentVideo?.title}</Title>
        <Detail>
          <Info>{currentVideo?.views} views * {format(currentVideo?.createdAt)}</Info>
          <Buttons>
            <ButtonIn onClick={handelLike}>
              {currentVideo?.likes?.includes(currentUser?._id)?<ThumbUpIcon/>:<ThumbUpOffAltIcon/>} {currentVideo?.likes?.length}
            </ButtonIn>

            <ButtonIn  onClick={handelDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id)?<ThumbDownAltIcon/>:<ThumbDownOffAltIcon/>} {currentVideo?.dislikes?.length}
            </ButtonIn>

            <ButtonIn>
              <ShareIcon/> Share
            </ButtonIn>
            <ButtonIn>
             <BookmarkAddedIcon/> save
            </ButtonIn>
          </Buttons>
        </Detail>
        <Hr/>
        <Channel>
             <ChannelInfo>
             <Image src={channel.img}/>
             <ChannelDetail>

             <Link to={`/Channel/${channel._id}`} style={{textDecoration:"none"}}>
                     <ChannelName>{channel.name}</ChannelName>
                </Link>
             
             <ChannelCounter> {currentUser?.SubscribedUsers?.length} subscriber</ChannelCounter>
             <Description> {currentVideo?.desc}</Description>
             </ChannelDetail>
             </ChannelInfo>
           <Subscribe onClick={handelSub}>{currentUser?.SubscribedUsers?.includes(channel._id)? "SUBSCRIBED":"SUBSCRIBE"}</Subscribe>
        </Channel>
        <Hr/>
        <Comments videoId={currentVideo?._id}/>
      </Content>
     
     <Recommendation tags={currentVideo?.tags}/>
    </Container>
  )
}

export default Videos

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useEffect, useState } from 'react'
import ChannelCard from '../comp/ChannelCard'
import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { subscription } from '../redux/userSlice';
import {currentChannel}from "../redux/currentChannelview"


const Container=styled.div`
display:flex;
flex-wrap:wrap;
`
const Image=styled.img`
`
const Title=styled.h1`
color:${({theme})=>theme.text};
`
const Head=styled.div`
display:flex;
flex-direction:row;
height:150px;
width:100%;
background-color:orangered;
justify-content:center;
display:flex;
align-items:center;
gap:20px;
`
const Body=styled.div`
width:100%;
display:flex;
justify-content:space-between;
flex-wrap:wrap;
padding:20px 50px;
`
const Imagerad=styled.img`
height: 50px;
border-radius:50%;
width: 50px;`

const Middle=styled.div`
display:flex;
justify-content:space-between;
align-items:center;
height: 40px;
border-radius:50%;
width: 100%;
padding:35px 5px`

const Header =styled.div`
display: flex;
flex-direction:column;
`
const  Left  =styled.div`
display: flex;
flex-direction:row;
gap:20px;
`
const Right =styled.div`
`
const  H1  =styled.h1`
`
const H3 =styled.h3`
`
const Subscribe=styled.button`
background-color:#cc1a00;
font-weight: 500;
color:white;
border: none;
border-radius:3px;
height:max-content;
padding:10px 20px;
cursor: pointer;
`





const Channel = () => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state=>state.user);
   const params=useParams();
  
   const [channel,setchannel]=useState([])
   const [videos,setVideos]=useState([])

   useEffect(()=>{
     const fetchVideos = async()=>{
        const channel= await axios.get(`http://localhost:8000/api/users/find/${params.id}`,{headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
        dispatch(currentChannel(params.id))
        setchannel(channel.data)
       // console.log("channel",channel.data)
        const res= await axios.get(`http://localhost:8000/api/videos/findsamevideo/${channel.data._id}`,{headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
      //  console.log("videos",res.data)
        setVideos(res.data)
   }
   fetchVideos()
   },[params,dispatch])


   const handelSub=async()=>{
     currentUser.SubscribedUsers.includes(channel._id)
        ? await axios.put(`http://localhost:8000/api/users/unsub/${channel._id}`,{data:"mm"},
          {headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
        : await axios.put(`http://localhost:8000/api/users/sub/${channel._id}`,{data:"mm"},
          {headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
         dispatch(subscription(channel._id))
  }

  return (
    <Container>
      <Head>
           <Image src={channel.img}/>
           <Title>{channel.name}</Title>
      </Head>
      <Middle>
            <Left>
               <Imagerad src={channel.img}/>
                 <Header>
                     <H1>{channel?.name}</H1>
                     <H3>{currentUser?.SubscribedUsers?.length} subscriber</H3>
                 </Header>
             </Left>
             <Right>
                <Subscribe onClick={handelSub}>{currentUser?.SubscribedUsers?.includes(channel._id)? "SUBSCRIBED":"SUBSCRIBE"}</Subscribe>
             </Right>
      </Middle>
      <Body>
           {videos.map((video)=> (
            <ChannelCard key={video._id} Channel={Channel} video={video}/>
            ))}
      </Body>
        
    </Container>
  )}

export default Channel
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
