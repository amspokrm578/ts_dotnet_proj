import React from 'react';
import './App.css';
// Tailwind is loaded via src/index.css
import Navbar from './Components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Hero from './Components/Hero/Hero';



function App() {
  return (
        <>
        <Navbar/>
        <Outlet/>
        </>
      );
}

export default App;
