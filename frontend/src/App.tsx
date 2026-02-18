import React from 'react';
import './App.css';
// Tailwind is loaded via src/index.css
import Navbar from './Components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Chatbot from './Components/Chatbot/Chatbot';



function App() {
  return (
        <>
        <Navbar/>
        <Outlet/>
        <Chatbot />
        </>
      );
}

export default App;
