import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import axios from 'axios';
import Card from "./Card" 
const Container=styled.div`
flex:2;
`;

const Recommendation = ({tags}) => {

    const [videos,setVideos]=useState([])
    useEffect(()=>{
      console.log(tags)
      const fetchVideos = async()=>{
         const res= await axios.get(`https://youtubenode.onrender.com/api/videos/tags?tags=${tags}`,{headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
         setVideos(res.data)
         console.log(res.data)
    }
    fetchVideos()
  },[tags])

  return (
    <Container>

        {videos.map((video)=>(
        <Card type="sm" key={video._id} video={video}/>)
        )}
    </Container>
  )
}

export default Recommendation