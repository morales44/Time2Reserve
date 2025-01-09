import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../CSS/DetalleRestaurante.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const DetallesRestaurante = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/restaurants/name/${name}`);
                setRestaurant(response.data);

                const token = localStorage.getItem('token');
                if (!token) {
                    console.warn("Token no encontrado. Por favor, inicia sesión.");
                    return;
                }

                const checkFavoriteResponse = await axios.post(
                    'http://localhost:8000/auth/favorite-restaurants/check',
                    { restaurantID: response.data.id }, // Ajusta según lo esperado por el backend
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setIsFavorite(checkFavoriteResponse.data.isFavorite);
            } catch (error) {
                console.error("Error obteniendo los datos del restaurante o estado de favorito:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantDetails();
    }, [name]);

    const toggleFavorite = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn("Token no encontrado. Por favor, inicia sesión.");
                return;
            }

            if (isFavorite) {
                const response = await axios.delete(
                    'http://localhost:8000/auth/favorite-restaurants/delete',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: { restaurant: restaurant.id }, // Verifica el campo
                    }
                );
                console.log(response.data.message);
                setIsFavorite(false);
            } else {
                const response = await axios.post(
                    'http://localhost:8000/auth/favorite-restaurants/add',
                    { restaurant: restaurant.id }, // Verifica el campo
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data.message);
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Error cambiando el estado de favorito:', error);
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!restaurant) {
        return <p>No se encontraron datos para el restaurante.</p>;
    }

    const image = location.state?.image || '';

    return (
        <div className="restaurant-details-container">
            <button className="back-button" onClick={() => navigate(-1)}>←</button>
            <div className="restaurant-image">
                <img src={image} alt={restaurant.name} />
            </div>
            <div
                style={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
                onClick={toggleFavorite}
            >
                {isFavorite ? (
                    <FaHeart color="red" size={24} />
                ) : (
                    <FaRegHeart color="red" size={24} />
                )}
            </div>
            <h2>{restaurant.name}</h2>
            <p>Ciudad: {restaurant.ciudad}</p>
            <p>Dirección: {restaurant.barrio}</p>
            <p>Teléfono: {restaurant.telefono}</p>
        </div>
    );
};

export default DetallesRestaurante;
