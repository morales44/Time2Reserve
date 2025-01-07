import React, { useState } from 'react';
import axios from 'axios';
import '../../CSS/Home.css';
import zubiburu from '../../CSS/Imagenes/zubiburu.jpg';
import atseden from '../../CSS/Imagenes/atseden.jpg';
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
  { name: "Zubiburu", image: zubiburu },
  { name: "Atseden Ledesma, 5", image: atseden },
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
        <div className="titulo">
          LOS MÁS BUSCADOS
        </div>

        {/* Galería de restaurantes */}
        <div className="gallery">
          {restaurants.map((restaurant, index) => (
           <DatosRestaurante restaurant = {restaurant} index = {index} token = {localStorage.getItem('token')}/>
          ))}
        </div>
      </section>

     
    </main>
  );
};

export default Home;
