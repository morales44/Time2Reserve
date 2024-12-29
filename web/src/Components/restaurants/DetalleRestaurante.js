import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../CSS/DetalleRestaurante.css';

const DetallesRestaurante = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // Para obtener la imagen pasada en el estado
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setRestaurant(null);
        setLoading(true);

        console.log("Buscando restaurante:", name);
        axios
            .get(`/api/restaurants/name/${name}`)
            .then(response => {
                console.log("Datos del restaurante:", response.data);
                setRestaurant(response.data);
            })
            .catch(error => {
                console.error("Error obteniendo los datos del restaurante:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [name]);

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

            {/* Detalles del restaurante */}
            <h2>{restaurant.name}</h2>
            <p>Ciudad: {restaurant.ciudad}</p>
            <p>Dirección: {restaurant.direccion}</p>
            <p>Teléfono: {restaurant.telefono}</p>
        </div>
    );
};

export default DetallesRestaurante;
