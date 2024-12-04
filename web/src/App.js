import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth/Auth';
import Home from './Components/restaurants/Home';

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

        {/* Usar el componente Routes */}
        <Routes>
          <Route path="/" element={<Auth onLogin={handleLogin} />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
