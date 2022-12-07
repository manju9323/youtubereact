import './App.css';
import React, { useState } from 'react';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Menu from './comp/menu';
import Nav from './comp/navbar';
import Signin from './pages/Signin';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { lightTheme,darkTheme } from './utils/Theme';
import {ToastContainer} from 'react-toastify';
import Channel from "./pages/Channel";
import History from './pages/History';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Search from './pages/Search';

const Container = styled.div`
display:flex;
`;

const Menubar = styled.div`

 flex:1;
 min-width:200px;    
  background-color: ${({theme})=>theme.bg};
  height: 100vh;
  overflow-y: scroll;
  overflow-x: scroll;
  position:sticky;
top:0px;
font-size: 14px;
  color: ${({theme})=>theme.text};
`;

const Mainbar = styled.div`
flex:7;
color:${({theme})=>theme.text};
background-color:${({theme})=>theme.bg};

`;


const Wrapper= styled.div`
padding:15px 20px;


`;




function App() {

  const [darkMode,setDarkMode]=useState(true)


  return (
  <ThemeProvider theme={darkMode ? darkTheme:lightTheme }> 
    <Container>
       <BrowserRouter>
         <Menubar className='menu'>
            <Menu dark={darkMode} light={setDarkMode}/>
         </Menubar>       
         <Mainbar>
            <Nav/>
            <Wrapper>
             <Routes>
               <Route path="/" >
                <Route index element={<Home type="random"/>} />
                <Route path="/trends" element={<Home type="trend"/>} />
                <Route path="/subscriptions" element={<Home type="sub"/>} />
                <Route path="/search" element={<Search/>} />
                <Route path="/signin" element={<Signin/>} />
                <Route path="video" >
                  <Route path=":id" element={<Videos />} />
                </Route>
                <Route path="/channel/:id" element={<Channel/>} />
                <Route path="/history" element={<History/>} />
               </Route>
             </Routes>
            </Wrapper>
         </Mainbar>
      </BrowserRouter>
      <ToastContainer/>
    </Container>
  </ThemeProvider>
  );
}

export default App;
/*import './App.css';
import React from 'react';

import Main from './comp/main';
import Menu from './comp/menu';
import Navbar from './comp/navbar';



function App() {
  return (
  
    <div className="App">
        <div className='menu'>
          <Menu/>
        </div>       
        <div className='App2'>
          <Navbar/>
          <Main/>
        </div>

  
    </div>
  );
}

export default App;
*/ 