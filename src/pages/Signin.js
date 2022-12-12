import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { toast} from 'react-toastify';
import { useDispatch} from 'react-redux';
import { loginFailure, loginStart, loginSucess } from '../redux/userSlice';
import {auth,provider} from "../firebase";
import {signInWithPopup} from "firebase/auth"
import {useNavigate} from "react-router-dom"

const Container =styled.div`
display: flex;
align-items:center;
justify-content:center;
height:100vh;
`
const Wrapper=styled.div`
display:flex;
align-items:center;
flex-direction:column;
background-color:${({theme})=>theme.bgLighter};
border: 1px solid ${({theme})=>theme.soft};
padding:20px 50px;
gap:10px
`

const Title=styled.h1`
font-size: 24px;
`
const SubTitle=styled.h2`
font-size: 20px;
font-weight: 300;
`
const Input=styled.input`
border:${({theme})=>theme.soft};
color:${({theme})=>theme.text};
border-radius:3px;
padding: 10px;
background-color:transparent;
width: 100%;
`
const Button=styled.button`
border-radius:3px;
border:none;
padding: 10px 20px;
font-weight: 500;
cursor:pointer;
background-color:${({theme})=>theme.soft};
color:${({theme})=>theme.textSoft};
`

function Signin() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const dispatch=useDispatch();
  const navigate = useNavigate()
   
  const handleLogin=async(e)=>{
  e.preventDefault();
  dispatch(loginStart())
  try{
    await axios.post("https://youtubenode.onrender.com/api/auth/login",{email,password}
    )
   
    .then( res=>{
      dispatch(loginSucess(res.data.others))
      localStorage.setItem("mm",JSON.stringify(res.data.token))
      navigate(`/`)
     })
     .catch(err=>{toast.error(err.response.data.message)
      console.log("jjj",err.response.data.message)
    })
    
  }
  catch(err){
    console.log("yyy",err)
     dispatch(loginFailure())
  
  }}

  const register=async(e)=>{
  e.preventDefault();
  try{
    await axios.post("https://youtubenode.onrender.com/api/auth/register",{email,password,name}
    )
    .then( res=>{
      navigate(`/`)
     })
     .catch(err=>{toast.error(err.response.data.message)
      console.log("jjj",err.response.data.message)
    })
  }
  catch(err){
    console.log("yyy",err) 
  }}

const Googlebutton=async()=>{
  dispatch(loginStart())
  signInWithPopup(auth,provider)
  .then((result)=>{
    console.log("users",result)
      axios.post("https://youtubenode.onrender.com/api/auth/google",
      { name:result.user.displayName,
        email:result.user.email,
        img:result.user.photoURL})
        .then((res)=>{
        dispatch(loginSucess(res.data.others))
       localStorage.setItem("mm",JSON.stringify(res.data.token))
      })
      navigate(`/`)
  })
  .catch(error=>{
    dispatch(loginFailure())
  })
}

  return (
    <Container>
        <Wrapper>
        <Title>Sign in</Title>
            <SubTitle>to continue to MM Tube</SubTitle>
            <Input type="email" placeholder='username' onChange={(e)=>setEmail(e.target.value)}/>
            <Input type="password" placeholder='password'  onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={handleLogin}>Signin</Button>
            <Title>or</Title>
            <Button onClick={Googlebutton}>Signin with Google </Button>
            <Title>or</Title>
            <Input type="text" placeholder='username' onChange={(e)=>setName(e.target.value)}/>
            <Input type="email" placeholder='email'  onChange={(e)=>setEmail(e.target.value)}/>
            <Input type="password" placeholder='password'  onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={register} >Signup</Button>

        </Wrapper>
    </Container>
  )
}

export default Signin