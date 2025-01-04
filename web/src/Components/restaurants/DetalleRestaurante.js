import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../CSS/DetalleRestaurante.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const DetallesRestaurante = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // Para obtener la imagen pasada en el estado
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const {token} = localStorage.getItem('token');  

    useEffect(() => {
        setRestaurant(null);
        setLoading(true);

        console.log("Buscando restaurante:", name);
        axios
            .get(`/api/restaurants/name/${name}`)
            .then(response => {
                console.log("Datos del restaurante:", response.data);
                setRestaurant(response.data);
                const fetchFavoriteStatus = async () => {
                    try {
                        console.log("token=", localStorage.getItem('token'));
                        const response2 = await axios.post(
                            'http://localhost:8000/auth/favorite-restaurants/check',
                            { id: String(response.data.id) },
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}` // Incluye el token en el encabezado
                                }
                            }
                        );
                        setIsFavorite(response2.data.isFavorite);
                    } catch (error) {
                        console.error('Error checking favorite state:', error);
                    }
                };
        
                fetchFavoriteStatus();
            })
            .catch(error => {
                console.error("Error obteniendo los datos del restaurante:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [name]);
    
        // Función para alternar el estado de favorito
        const toggleFavorite = async () => {
            try {
                setIsFavorite(!isFavorite);
                console.log(localStorage.getItem('token'))
                if (isFavorite) {
                    try {
                        console.log(restaurant.id);
                        const response = await axios.delete(
                            `http://localhost:8000/auth/favorite-restaurants/delete`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }, data: { restaurant: restaurant.id }
                            }
                        );
                
                        console.log(response.data.message);
                    } catch (error) {
                        console.error('Error deleting favorite restaurant:', error);
                    }
                } else {
                    try {
                        const response = await axios.post(
                            'http://localhost:8000/auth/favorite-restaurants/add',
                            { restaurant: restaurant.id },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );
                
                        console.log(response.data.message);
                    } catch (error) {
                        console.error('Error adding favorite restaurant:', error);
                    }
                }
            } catch (error) {
                console.error('Error changing favorite state:', error);
            }
        };
    

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!restaurant) {
        return <p>No se encontraron datos para el restaurante.</p>;
    }

    const image = location.state?.image || ''; // Obtener la imagen pasada desde el Link

    return (
        <div className="restaurant-details-container">
            {/* Flecha de regreso */}
            <button className="back-button" onClick={() => navigate(-1)}>←</button>

            {/* Imagen del restaurante */}
            <div className="restaurant-image">
                <img src={image} alt={restaurant.name} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }} onClick={toggleFavorite}>
                {isFavorite ? (
                    <FaHeart color="red" size={24} /> // Corazón lleno en rojo
                ) : (
                    <FaRegHeart color="red" size={24} /> // Corazón contorno en rojo
                )}
            </div>

            {/* Detalles del restaurante */}
            <h2>{restaurant.name}</h2>
            <p>id: {restaurant.id}</p>
            <p>Ciudad: {restaurant.ciudad}</p>
            <p>Dirección: {restaurant.barrio}</p>
            <p>Teléfono: {restaurant.telefono}</p>
        </div>
    );
};

export default DetallesRestaurante;
