import React, { useState } from 'react';
import axios from 'axios';
import '../../CSS/Auth.css';
import { useNavigate } from 'react-router-dom';
import { useToken } from './tokenContext';

const Auth = ({onLogin})=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setAuthToken } = useToken();

    const login = async () => {
        try {
            const params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);

            console.log('Datos de autenticación enviados:', username, password);
            const response = await axios.post('/api/auth/token', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            console.log('response.status:', response.status);
            console.log('TOKEN:', response.data.access_token);
            if (response.status === 200) {
                setAuthToken(response.data.access_token);
                localStorage.setItem('token', response.data.access_token);
                onLogin();
                navigate('/home');
                console.log('INICIO DE SESIÓN EXITOSO', response.data);
                setError('');
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
            if (error.response && error.response.status === 401) {
                setError('Usuario o contraseña incorrectos. Intentelo de nuevo.');
            } else {
                setError('Ocurrió un problema con el inicio de sesión. Intentelo de nuevo.');
            }
        }
    };

    return (
        <div className="auth-container">
            <h1 className="auth-title">Time2Reserve</h1>
            <div className="auth-input-container">
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
                <button className="auth-button" onClick={login}>Iniciar Sesión</button>
                <button className="auth-button" /*onClick={register}*/>Registrarse</button>
            </div>
        </div>
    );
}

export default Auth