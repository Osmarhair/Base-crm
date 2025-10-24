import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login'; 
import Prioridades from './Components/Tarefas/Listas/Prioridades'; 
import './App.css';

export default function App() { 
  return (
    
    <div className='App'> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/quadro" element={<Prioridades />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}