import React,{useEffect, useState} from 'react'
import axios from "axios"
import styled from '@emotion/styled';
import Card from '../comp/Card';


const Container = styled.div`
display:flex;
justify-content:space-between;
flex-wrap:wrap;
padding:35px 35px;

`;

function Home({type}) {

  const [videos,setVideos]=useState([])
  useEffect(()=>{
    const fetchVideos = async()=>{
       const res= await axios.get(`https://youtubenode.onrender.com/api/videos/${type}`,{headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
       console.log("home",res.data)
       setVideos(res.data)
  }
  fetchVideos()
},[type])

  return (
    <Container>
      {
        videos.length>0 ? <>{videos.map((video)=> (
          <Card key={video._id} video={video}/>
          ))}</> : 
          <div>you have no subscribtion till now</div>
      }
    </Container>
  )
}

export default Home