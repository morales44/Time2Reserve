import React, { useState } from 'react';
import axios from 'axios';
import '../../CSS/Auth.css';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = async () => {
        try {
            const userData = {
                name: name,
                username: username,
                password: password,
            };
            console.log('Datos de registro enviados:', username, password);
            const response = await axios.post('/api/auth/register', userData);

            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error de registro:', error);
        }
    }

    return (
        <div className="auth-container">
            <h1 className="auth-title"> </h1>
            <div className="auth-input-container">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="auth-button-container">
                <button className="auth-button" onClick={register}>Registrarse</button>
                <br/>
                <br/>
                <div className="auth-register">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        <b>Inicia Sesión</b>
                    </Link>
            </div>
            </div>
        </div>
    );
}

export default Register;