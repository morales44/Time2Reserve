import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './Components/header/Header';
import Auth from './Components/Auth/Auth';
import Home from './Components/restaurants/Home';
import Restaurante from './Components/restaurants/restaurantes';
import Register from './Components/Auth/Register';
import DetalleRestaurante from './Components/restaurants/DetalleRestaurante';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); // Autentica al usuario
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Cierra la sesión
    localStorage.clear(); // Limpia cualquier dato guardado en el almacenamiento local
    console.log("Sesión cerrada");
  };

  const AppContent = () => {
    const location = useLocation();

    useEffect(() => {
      // Muestra el header solo si la ruta no es "/"
      setShowHeader(location.pathname !== '/');
    }, [location]);

    return (
      <>
        {/* Mostrar Header solo si está autenticado y la ruta no es "/" */}
        {isAuthenticated && showHeader && <Header onLogout={handleLogout} />}

        {/* Configuración de rutas */}
        <Routes>
          <Route path="/" element={<Auth onLogin={handleLogin} />} />
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/restaurantes"
            element={isAuthenticated ? <Restaurante /> : <Navigate to="/" />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="restaurants/name/:name"
            element={isAuthenticated ? <DetalleRestaurante /> : <Navigate to="/" />}
          />
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
