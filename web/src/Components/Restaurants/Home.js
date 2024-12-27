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
import DatosRestaurante from './DatosRestaurante';

const restaurants = [
  { name: "Restaurante Amaren Bilbao", image: amaren },
  { name: "Restaurante Bertys", image: bertys },
  { name: "La Bodega de Los Secretos", image: bodega },
  { name: "Roostiq", image: roostiq },
  { name: "El Asador de Aranda", image: aranda },
  { name: "Arume", image: arume },
  { name: "El Rinconcillo", image: rinconcillo },
  { name: "Filo", image: filo },
  { name: "Taberna Gasca", image: tabernaG },
  { name: "La Clandestina", image: clandestina },
];

const Home = () => {
  const handleRestaurantClick = (restaurant) => {
    
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
           <DatosRestaurante restaurant = {restaurant} index = {index}/>
          ))}
        </div>
      </section>

     
    </main>
  );
};

export default Home;
