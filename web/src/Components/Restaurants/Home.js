import React from 'react';
import '../../CSS/Home.css';

const Home = () => (
  <main className="home" role="main">
    <header>
      <h1 className="titulo">TIME2RESERVE</h1>
      
    </header>
    <section className="contenido">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar rutas, destinos o carriles..."
        />
        <button className="search-button" type="button">
          Buscar
        </button>
      </div>
      <div>
        <article className="texto">
        <h2 className="subtitulo">
          La plataforma que te ayuda a descubrir y explorar los mejores lugares para andar en bicicleta, ya sea en rutas naturales tranquilas o recorridos urbanos desafiantes. Encuentra destinos increíbles, adaptados a tu nivel y preferencias, para disfrutar al máximo cada aventura en dos ruedas.
          <br /><br />
          Descubre todos los carriles disponibles en tu ciudad y explora una red de rutas ideales para disfrutar de un paseo en bicicleta. Ya sea que prefieras un recorrido tranquilo o un trayecto más largo, estos carriles ofrecen opciones seguras y cómodas para ciclistas de todos los niveles. Así que, ¿qué esperas para comenzar a pedalear y descubrir nuevos destinos?
        </h2>
        </article>
      </div>
      
    </section>
  </main>
);

export default Home;