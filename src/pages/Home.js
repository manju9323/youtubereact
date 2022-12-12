import React,{useEffect, useState} from 'react'
import axios from "axios"
import styled from '@emotion/styled';
import Card from '../comp/Card';
import "./Home.css"; 


const Container = styled.div`
display:flex;
justify-content:space-between;
flex-wrap:wrap;
padding:35px 35px;

`;



function Home({type}) {

  const [videos,setVideos]=useState([])
  const [wait,setwait]=useState(null)
 

  function timeout(a,s) {
    setTimeout(()=>{

      if(a>0){
       setwait(s);} if(a==0){
    //    console.log(19,a)
      setwait("please refersh the page")
      }
    },a*1000)
  }


  //---------------------------------------
  let nu=0
  function give (data,dat){
    
    if(data>-1){
       nu=nu+1
}
{
const num=data-1
if(num>=0)
{
dat(num,nu)
give(num,dat)
}
}}


//-----------------------------------


  useEffect(()=>{
   
    const fetchVideos = async()=>{
      give(20,timeout)
       const res= await axios.get(`https://youtubenode.onrender.com/api/videos/${type}`,{headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
       
       console.log("home",res.data)
       setwait(null)
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
          <div className='sec'>Please wait <sapn className="wait">{wait}</sapn>`sec to start server </div>
      }
    </Container>
  )
}

export default Home