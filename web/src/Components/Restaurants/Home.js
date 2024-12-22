import React from 'react';
import '../../CSS/Home.css';
import amaren from '../../CSS/Imagenes/amaren.jpg';
import bertys from '../../CSS/Imagenes/bertys.jpg';

const restaurants = [
  { name: "Restaurante Amaren Bilbao", image: amaren },
  { name: "Restaurante Bertys", image: bertys },
  { name: "Sabores del Mundo", image: "https://via.placeholder.com/300" },
  { name: "El Fogón de Pepe", image: "https://via.placeholder.com/300" },
  { name: "Delicias Andinas", image: "https://via.placeholder.com/300" },
  { name: "Casa Bella", image: "https://via.placeholder.com/300" },
  { name: "El Rincón Vegetariano", image: "https://via.placeholder.com/300" },
  { name: "Mariscos La Ola", image: "https://via.placeholder.com/300" },
  { name: "Pizzería Bella Italia", image: "https://via.placeholder.com/300" },
  { name: "Sushi & Rolls", image: "https://via.placeholder.com/300" },
];

const Home = () => (
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
          <div key={index} className="gallery-item">
            <img src={restaurant.image} alt={restaurant.name} />
            <p>{restaurant.name}</p>
          </div>
        ))}
      </div>
    </section>
  </main>
);

export default Home;
