import React, { useState, useEffect } from 'react';
import '../../CSS/Home.css';
import { Link } from "react-router-dom";

const DatosRestaurante = ({ restaurant, index, token }) => {
    return (
        <div
            key={index}
            className="gallery-item">
            <img src={restaurant.image} alt={restaurant.name} />
            <p>{restaurant.name}</p>
            <Link
                to={{
                    pathname: `/restaurants/name/${restaurant.name}`,
                }}
                state={{ image: restaurant.image }} // Pasar la imagen a través del estado
                className="details-button"
            >
                Ver detalles
            </Link>
        </div>
    );
};

export default DatosRestaurante;
