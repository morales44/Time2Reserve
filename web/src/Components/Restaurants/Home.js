import React, { useState } from 'react';
import axios from 'axios';
import '../../CSS/Home.css';
import amaren from '../../CSS/Imagenes/amaren.jpg';
import bertys from '../../CSS/Imagenes/bertys.jpg';
import bodega from '../../CSS/Imagenes/bodega.jpg';
import roostiq from '../../CSS/Imagenes/roostiq.jpg';
import aranda from '../../CSS/Imagenes/aranda.jpg';
import arume from '../../CSS/Imagenes/arume.jpg';
import rinconcillo from '../../CSS/Imagenes/rinconcillo.jpg';
import filo from '../../CSS/Imagenes/filo.jpg';
import tabernaG from '../../CSS/Imagenes/tabernaG.jpg';
import clandestina from '../../CSS/Imagenes/clandestina.jpg';

const restaurants = [
  { name: "Restaurante Amaren Bilbao", image: amaren },
  { name: "Restaurante Bertys", image: bertys },
  { name: "La Bodega de Los Secretos", image: bodega },
  { name: "Restaurante Roostiq", image: roostiq },
  { name: "El Asador de Aranda", image: aranda },
  { name: "Restaurante Arume", image: arume },
  { name: "El Rinconcillo", image: rinconcillo },
  { name: "Restaurante Filo", image: filo },
  { name: "Taberna Gasca", image: tabernaG },
  { name: "La Clandestina", image: clandestina },
];

const Home = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRestaurantDetails = async (restaurantName) => {
    setIsLoading(true); // Mostrar "Cargando datos..."
    try {
      const response = await axios.get(`http://localhost:7000/restaurants/city/Zaragoza`);
      const data = response.data;

      // Busca el restaurante por nombre
      const selectedRestaurant = data.find((item) => item.name.toLowerCase() === restaurantName.toLowerCase());
      if (selectedRestaurant) {
        setRestaurantDetails(selectedRestaurant);
      } else {
        alert("No se encontraron datos para el restaurante seleccionado.");
        setSelectedRestaurant(null); // Cierra el popup si no hay coincidencias
      }
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
      alert("Ocurrió un error al obtener los datos. Inténtalo de nuevo.");
      setSelectedRestaurant(null); // Cierra el popup en caso de error
    } finally {
      setIsLoading(false); // Ocultar "Cargando datos..."
    }
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    fetchRestaurantDetails(restaurant.name); // Pasa el nombre del restaurante
  };

  const handleClosePopup = () => {
    setSelectedRestaurant(null);
    setRestaurantDetails(null);
  };

  return (
    <main className="home" role="main">
      <section className="contenido">
        {/* Barra de búsqueda */}
        <div className="search-bar1">
          <input
            type="text"
            className="search-input1"
            placeholder="Buscar restaurantes..."
          />
          <button className="search-button1" type="button">
            Buscar
          </button>
        </div>

        {/* Galería de restaurantes */}
        <div className="gallery">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="gallery-item"
              onClick={() => handleRestaurantClick(restaurant)}
            >
              <img src={restaurant.image} alt={restaurant.name} />
              <p>{restaurant.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popup con los detalles del restaurante */}
      {selectedRestaurant && (
        <div className="popup">
          <button className="close-btn" onClick={handleClosePopup}>
            &times;
          </button>
          {isLoading ? (
            <p>Cargando datos...</p>
          ) : restaurantDetails ? (
            <div className="popup-content">
              <h2>{restaurantDetails.name}</h2>
              <p><strong>Dirección:</strong> {restaurantDetails.barrio}</p>
              <p><strong>Teléfono:</strong> {restaurantDetails.telefono || "No disponible"}</p>
              <p><strong>Ciudad:</strong> {restaurantDetails.ciudad}</p>
              <p><strong>Categorías:</strong> {restaurantDetails.categorias.map((cat) => cat.title).join(", ")}</p>
              <p><strong>Abierto:</strong> {restaurantDetails.abierto ? "Sí" : "No"}</p>
            </div>
          ) : (
            <p>Error cargando los datos del restaurante.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default Home;
