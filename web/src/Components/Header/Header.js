// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/Header.css';
const Header = ({onLogout}) => {
  return (
    <header className="header">
      <h1>Time2Reserve</h1>
      <div className="menu-container">
        <nav className="menu">
          <Link to="/Home">Inicio</Link>
          <Link to={`/restaurantes`} className="details-button">
                Restaurantes
            </Link>
          <Link to="/favorites">Favoritos</Link>
          <button onClick={onLogout} className="logout-button">
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
