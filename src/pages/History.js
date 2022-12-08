import React, { useEffect, useState } from 'react'
import axios from "axios";
import Card from '../comp/Card';
import styled from '@emotion/styled';


const OuContainer=styled.div`
display:flex;
flex-direction:row;
`

const Container=styled.div`
flex:4
`
const InContainer=styled.div`
flex:4;
display:flex;
flex-wrap:wrap;
justify-content:center;
`
const Button=styled.div`
height:20px;
border:none;
&:hover{
  background-color:${({theme})=>theme.bg};
  color:${({theme})=>theme.text};
  cursor: pointer;
}
`


function History() {
    const [his,setHis]=useState([])
 
    useEffect(()=>{
        const fetchVideos = async()=>{
           const res= await axios.get(`https://youtubenode.onrender.com/api/videos/history`,{headers:{'mm':`${JSON.parse(localStorage.getItem("mm"))}`}})
         //  console.log("videos",res.data)
           setHis(res.data)
             }        
           fetchVideos()
          },[]) 
        
        return ( 
          <>
          <div>Watch History</div>
          <OuContainer>
           { his.length>0 ?  <Container>{his.map((hi)=>  (<Card type="sm" key={hi._id} video={hi}/>))
          }</Container>
          :<div>please Login to watch yourhistory,likes,dislikes</div>
          }
          <InContainer>
            <Button>
              clear all watch History
            </Button>
          </InContainer>
          </OuContainer>
          </>
        )
      }

export default History