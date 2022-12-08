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
  const dispatch = useDispatch();
  const path =useParams()
  const {currentUser} = useSelector(state=>state.user);  
  const {currentVideo} = useSelector(state=>state.video);
  const [channel,setChannel]=useState({})

 // const path =useParams().pathname.split("/")[2]

 // const [views,setViews]=useState(0)
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const videoRes=await axios.get(`https://youtubenode.onrender.com/api/videos/find/${path.id}/${currentUser? currentUser._id : "nouser"}`
        )
        const channelRes=await axios.get(`https://youtubenode.onrender.com/api/users/find/${videoRes.data.userId}`
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
    
     await axios.put(`https://youtubenode.onrender.com/api/users/like/${currentVideo._id}`,{data:"mm"},
     {headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
     dispatch(like(currentUser._id))
  }
  const handelDislike=async()=>{
    await axios.put(`https://youtubenode.onrender.com/api/users/dislike/${currentVideo._id}`,{data:"mm"},
    {headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
    dispatch(dislike(currentUser._id))
  }

  const handelSub=async()=>{
     currentUser.SubscribedUsers.includes(channel._id)
        ? await axios.put(`https://youtubenode.onrender.com/api/users/unsub/${channel._id}`,{data:"mm"},
          {headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
        : await axios.put(`https://youtubenode.onrender.com/api/users/sub/${channel._id}`,{data:"mm"},
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