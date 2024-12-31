import React from "react";
import "../../CSS/Home.css";
import { Link } from "react-router-dom";

const DatosCiudad = ({ city, index }) => {
    return (
        <div key={index} className="city-item">
            <h3 className="city-name">{city.name}</h3> {/* Solo muestra el nombre */}
            <Link
                to={`/restaurants/city/${city.name}`} // Navega a la página de restaurantes de la ciudad
                className="details-button"
            >
                Ver restaurantes
            </Link>
        </div>
    );
};

export default DatosCiudad;
