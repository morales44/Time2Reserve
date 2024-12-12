import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './Components/header/Header'
import Auth from './Components/Auth/Auth';
import Home from './Components/restaurants/Home'
import Restaurante from './Components/restaurants/restaurantes'
import Register from './Components/Auth/Register.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log("AUTHENTIFICATED:",isAuthenticated);
  };

  return (
    <Router>
      <div className="App">
        {/* Usar el componente Header */}
        {isAuthenticated && <Header/>}

        {/* Usar el componente Routes */}
        <Routes>
          <Route path="/" element={<Auth onLogin={handleLogin} />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
          <Route path="/restaurantes" element={<Restaurante />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
