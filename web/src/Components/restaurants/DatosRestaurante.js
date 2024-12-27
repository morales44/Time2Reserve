import React, { useState } from 'react';
import '../../CSS/Home.css';
import { Link } from "react-router-dom";

const datosRestaurante = ({restaurant, index})=> {
    return (
        <div
              key={index}
              className="gallery-item">
              <img src={restaurant.image} alt={restaurant.name} />
              <p>{restaurant.name}</p>
              <Link to={`/restaurants/name/${restaurant.name}`} className="details-button">
                Ver detalles
            </Link>
        </div>
    )


}

export default datosRestaurante