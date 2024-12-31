import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import "../../CSS/CiudadRestaurante.css";
import ElSur from '../../CSS/Imagenes/ElSur.JPG';

const CiudadRestaurante = () => {
  const { city } = useParams(); // Obtener la ciudad desde la URL
  const [restaurants, setRestaurants] = useState([]); // Almacena los restaurantes
  const [loading, setLoading] = useState(true); // Indicador de carga
  const navigate = useNavigate(); // Para manejar la navegación hacia atrás

  useEffect(() => {
    // Llamar a la API para obtener los restaurantes por ciudad
    fetch(`/api/restaurants/city/${city}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data); // Guardar los datos de los restaurantes
      })
      .catch((error) => {
        console.error("Error obteniendo los restaurantes:", error);
      })
      .finally(() => {
        setLoading(false); // Ocultar el indicador de carga
      });
  }, [city]);

  if (loading) {
    return (
      <div className="city-restaurants-container">
        <p>Cargando restaurantes...</p>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="city-restaurants-container">
        <div className="content-box">
          <h2>No se encontraron restaurantes en {city.toUpperCase()}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="city-restaurants-container">
      <div className="content-box">
        {/* Botón de flecha hacia atrás */}
        <button
          className="back-button"
          onClick={() => navigate(-1)} // Regresa a la página anterior
        >
          ←
        </button>

        <h2>Restaurantes en {city.toUpperCase()}</h2>
        <ul className="restaurant-list">
          {restaurants.map((restaurant, index) => (
            <li key={index} className="restaurant-item">
              <p>{restaurant.name}</p>
              {/* Botón "Ver detalles" */}
              <Link
                to={{
                  pathname: `/restaurants/name/${restaurant.name}`,
                }}
                className="details-button"
              >
                Ver detalles
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CiudadRestaurante;
