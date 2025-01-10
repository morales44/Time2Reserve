/*import React, { useState } from 'react';
import '../../CSS/Busqueda.css';
const Busqueda = () => {
  const [ciudad, setCiudad] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const handleBuscar = () => {
    console.log(`Ciudad: ${ciudad}, Especialidad: ${especialidad}`);
    // Lógica adicional para manejar la búsqueda
  };
  return (
    <main className="busqueda-home" role="main">
      <section className="busqueda-contenido">
        <div className="busqueda-apartado">
          <label htmlFor="ciudad" className="busqueda-label">CIUDAD</label>
          <input
            type="text"
            id="ciudad"
            className="busqueda-input"
            placeholder="Buscar...."
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />
        </div>
        <div className="busqueda-apartado">
          <label htmlFor="especialidad" className="busqueda-label">ESPECIALIDAD</label>
          <select
            id="especialidad"
            className="busqueda-select"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
          >
            <option value="" disabled>Seleccionar...</option>
            <option value="pizza">Pizza</option>
            <option value="hamburguesa">Hamburguesa</option>
            <option value="sushi">Sushi</option>
            <option value="italiana">Comida Italiana</option>
            <option value="china">Comida China</option>
          </select>
        </div>
        <div className="busqueda-boton-container">
          <button className="busqueda-search-button" type="button" onClick={handleBuscar}>
            BUSCAR
          </button>
        </div>
      </section>
    </main>
  );
};
export default Busqueda;*/