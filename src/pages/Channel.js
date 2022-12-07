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
                     <H3>{currentUser?.subscriber} subscriber</H3>
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