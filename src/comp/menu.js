import React from 'react'
import "./menu.css";
import {Link}from "react-router-dom"
import styled from '@emotion/styled';
import YouTubeIcon from '@mui/icons-material/YouTube';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HistoryIcon from '@mui/icons-material/History';
import VideocamIcon from '@mui/icons-material/Videocam';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TheatersIcon from '@mui/icons-material/Theaters';
import StreamIcon from '@mui/icons-material/Stream';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import NewspaperIcon from '@mui/icons-material/Newspaper';
/*import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';*/
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsBrightnessTwoToneIcon from '@mui/icons-material/SettingsBrightnessTwoTone';
import { useSelector } from 'react-redux';

const Menuinner = styled.div`
display: flex;
flex-direction: column;
padding:0px 20px;
text-transform: capitalize;

`;

const Headmenu = styled.div`
display: flex;
align-items: center;
padding-top: 20px;
padding-bottom: 10px;
background-color: ${({theme})=>theme.bg};
position:sticky;
top:0;
z-index:1000;
gap:15px;
`;
const Bodymenu = styled.div`
display: flex;
align-items:center;
gap:15px;
padding:7px 0px;
cursor:pointer;
 &:hover{
background-color:${({theme})=>theme.soft}
 }
`;
const Hr= styled.hr`
margin:12px 0px;
border:0.5px solid ${({theme})=>theme.soft};
`;
const Title= styled.h2`
font-size:14px;
font-weight:500;
margin-bottom: 20px;
color:#aaaaaa;
`;
const Button=styled.button`
display: flex;
align-items: center;
gap:5px;
padding:5px 15px;
background-color: transparent;
border:1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
margin-top: 10px;
cursor: pointer;
`;



function Menu({dark,light}) {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <Menuinner>

      <Link to="/" className='sticky' style={{textDecoration:"none",color:"inherit"}}>
      <Headmenu>
        <YouTubeIcon/>
           YouTube
      </Headmenu>
      </Link>
     
      <Link to="/"  style={{textDecoration:"none",color:"inherit"}}>
      <Bodymenu>
        <HomeIcon/>
           Home
      </Bodymenu>
      </Link>
     
      <Link to="/trends" style={{textDecoration:"none",color:"inherit"}}>
      <Bodymenu>
        <ExploreIcon/>
           shorts
           </Bodymenu> 
      </Link>

     
      
      <Link to="/subscriptions" style={{textDecoration:"none",color:"inherit"}}>
      <Bodymenu>
        <SubscriptionsIcon/>
           subscription
           </Bodymenu>
      </Link>
        
      
      <Hr className='hr'/>

      <Link to="/history" style={{textDecoration:"none",color:"inherit"}}>
      <Bodymenu>
        <LibraryMusicIcon/>
            library
      </Bodymenu>
      <Bodymenu>
        <HistoryIcon/>
            history
      </Bodymenu>
      </Link>
      
      <Hr className='hr'/>
      {!currentUser &&  <> <div className='signin'> 
         sign in to like videos, comments,subscribe.
         <Link to="/signin" style={{textDecoration:"none"}}>
         <Button > <AccountCircleIcon/>LOG IN</Button>
         </Link>
         
      </div>
      <Hr className='hr'/></>}
      
      
      {currentUser && 
<Link to={`/Channel/${currentUser._id}`} style={{textDecoration:"none",color:"inherit"}}>
<Bodymenu>
  <VideocamIcon/>
     your videos
</Bodymenu>          
</Link>}
      
    
      <Bodymenu>
        <WatchLaterIcon/>
          watch Later

      </Bodymenu>
      <Bodymenu>
        <ThumbUpIcon/>

           liked videos
      </Bodymenu>
      <Hr className='hr'/>


      <Title>
        Best of MMTUBE
      </Title>

      <Bodymenu>
        <LocalFireDepartmentIcon/>
      trending
      </Bodymenu>
    
      <Bodymenu>
        <MusicNoteIcon/>
       Music
      </Bodymenu>
      <Bodymenu>
        <TheatersIcon/>
       Films
      </Bodymenu>
      <Bodymenu>
        <StreamIcon/>
       live
      </Bodymenu>
      <Bodymenu>
        <SportsEsportsIcon/>
        game
      </Bodymenu>
      <Bodymenu>
        <NewspaperIcon/>
        Learing
      </Bodymenu>
      <Bodymenu>
        <CheckroomIcon/>
      Fashion beauty
      </Bodymenu>
      <Hr className='hr'/>
      <Bodymenu>
        <SettingsIcon/>
      settings
      </Bodymenu>
      <Bodymenu onClick={()=>{ light(!dark)}}>
        <SettingsBrightnessTwoToneIcon/>
        {dark ? "Light Mode" : "Dark Mode"}
      </Bodymenu>

      
    </Menuinner>
  )
}

export default Menu