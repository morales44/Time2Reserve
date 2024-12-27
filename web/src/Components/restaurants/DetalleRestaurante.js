import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetallesRestaurante = () => {
    const { name } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true); // Inicializamos `loading` como `true`.

    useEffect(() => {
        // Reinicia los estados para permitir nuevas consultas.
        setRestaurant(null);
        setLoading(true);

        console.log("Buscando restaurante:", name);
        axios
            .get(`/api/restaurants/name/${name}`)
            .then(response => {
                console.log("Datos del restaurante:", response.data);
                setRestaurant(response.data); // Guardamos los datos del restaurante.
            })
            .catch(error => {
                console.error("Error obteniendo los datos del restaurante:", error);
            })
            .finally(() => {
                setLoading(false); // Finalizamos el indicador de carga después de obtener los datos o si ocurre un error.
            });
    }, [name]); // Se ejecuta cada vez que `name` cambia.

    // Manejamos el estado de carga.
    if (loading) {
        return <p>Cargando...</p>;
    }

    // Manejamos el caso en el que no se encuentra el restaurante.
    if (!restaurant) {
        return <p>No se encontraron datos para el restaurante.</p>;
    }

    // Renderizamos los datos del restaurante cuando están disponibles.
    return (
        <div>
            <h1>Restaurante: {restaurant.name}</h1>
            <h1>Restaurante: {restaurant.ciudad}</h1>
            <h1>Restaurante: {restaurant.name}</h1>
            <h1>Restaurante: {restaurant.name}</h1>
        </div>
    );
};

export default DetallesRestaurante;
