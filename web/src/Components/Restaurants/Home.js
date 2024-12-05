import React from 'react';
import {Link} from 'react-router-dom'
import '../../CSS/Home.css';

const Home = () => (
  <div className='general'>
  <main className="home" role="main">
    <section className="contenido">
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar restaurantes..."
        />
        <button className="search-button" type="button">
          Buscar
        </button>
      </div>


      <Link to={`/restaurantes`} className="details-button">
                Ver detalles
            </Link>
      {/* Contenido principal */}
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
  </div>
);

export default Home;
