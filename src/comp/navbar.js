import React, { useState } from 'react'
import styled from '@emotion/styled';
import {Link, useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux'
//import VideocamIcon from '@mui/icons-material/Videocam';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Upload from './upload';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const Container=styled.div`
 position: sticky;
 z-index:1000;
 top:0;
 background-color:${({theme})=>theme.bgLighter} ;
 height:50px;
 `
const Wrapper=styled.div`
display:flex;
align-items:center;
height:100%;
padding:0px 20px;
justify-content:flex-end;
position:relative;
`
const Search=styled.div`
position: absolute;
left:0px;
width:40%;
right:0px;
margin:auto;
display:flex;
align-items:center;
justify-content:space-between;
padding:5px;
border:1px solid #ccc;
border-radius: 5px;
color:${({theme})=>theme.text}
`
const Input=styled.input`
border:none;
padding:6px;
background-color:transparent;
width:100%;
color:${({theme})=>theme.text}
`
const Button=styled.button`
    padding:5px 15px;
    background-color: transparent;
    border:1px solid #3ea6ff;
   border-radius: 3px;
    color:#3ea6ff;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap:5px;
`
const User=styled.div`
 display:flex;
 align-items:center;
 gap: 10px;
 font-weight: 500;
 color:${({theme})=>theme.text};
`
const Avatar=styled.img`
width: 32px;
height: 32px;
border-radius:50%;
background-color:#999;
`

function Nav() {
  const navigate=useNavigate()
  const [open,setOpen]=useState(false)
  const [q,setQ]=useState("")
  const {currentUser}=useSelector(state=>state.user)
  return (
    <>
  <Container>
     <Wrapper>
      <Search> 
          <Input placeholder='search' onChange={e=>setQ(e.target.value)} /> 
          <SearchTwoToneIcon onClick={()=>navigate(`/search?q=${q}`)}/>
      </Search>
    {currentUser ? (
      <User>
      <VideoCallIcon onClick={()=>setOpen(true)}/>
      <Avatar src={currentUser.img}/>
      {console.log(currentUser.name)}
      {currentUser.name}
      </User>
    ):
       (<Link to="signin" style={{textDecoration:"none"}}>
      <Button > <AccountCircleIcon/>SIGN IN</Button>
      </Link>)
  }
     </Wrapper>
  </Container>
  {open&& <Upload setOpen={setOpen}/>}
  </>
  )
}

export default Nav