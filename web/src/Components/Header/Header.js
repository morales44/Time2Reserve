// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/Header.css';

const Header = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout(); // Llama a la función pasada como prop
  };

  return (
    <header className="header">
      <h1>Time2Reserve</h1>
      <div className="menu-container">
        <nav className="menu">
          <Link to="/home">Inicio</Link>
          <Link to="/restaurantes" className="details-button">Restaurantes</Link>
          <Link to="/restaurants/favoritos">Favoritos</Link>
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
