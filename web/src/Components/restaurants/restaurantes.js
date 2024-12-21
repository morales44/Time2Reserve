import React, { useState } from "react";
import '../../CSS/Restaurantes.css';

const ciudades = [
    { nombre: "Madrid", descripcion: "Conoce los mejores restaurantes en Madrid" },
    { nombre: "Barcelona", descripcion: "Explora los sabores únicos de Barcelona" },
    { nombre: "Valencia", descripcion: "Prueba la auténtica paella en Valencia" },
    { nombre: "Sevilla", descripcion: "Disfruta de la gastronomía andaluza en Sevilla" },
    { nombre: "Bilbao", descripcion: "Saborea los pintxos en Bilbao" },
    { nombre: "Málaga", descripcion: "Descubre la cocina mediterránea en Málaga" },
    { nombre: "Granada", descripcion: "Explora los restaurantes con vistas a la Alhambra" },
    { nombre: "Zaragoza", descripcion: "Descubre los platos tradicionales de Zaragoza" },
    { nombre: "Alicante", descripcion: "Conoce los restaurantes junto al mar en Alicante" },
    { nombre: "Córdoba", descripcion: "Disfruta de la cocina cordobesa y su salmorejo" }
];

const Restaurante = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleCityClick = (city) => {
        setSelectedCity(city);
        setSearchTerm(""); // Reinicia el término de búsqueda al abrir una nueva ciudad
    };

    const handleClose = () => {
        setSelectedCity(null);
        setSearchTerm(""); // Limpia la barra de búsqueda al cerrar el popup
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="restaurantes-container">
            <h1>Restaurantes en España</h1>
            <div className="ciudades-list">
                {ciudades.map((ciudad, index) => (
                    <div
                        key={index}
                        className="ciudad-item"
                        onClick={() => handleCityClick(ciudad)}
                    >
                        <div className="ciudad-name">{ciudad.nombre}</div>
                    </div>
                ))}
            </div>
            {selectedCity && (
                <div className="info-popup">
                    <button className="close-btn" onClick={handleClose}>
                        &times;
                    </button>
                    <h2>{selectedCity.nombre}</h2>
                    <p>{selectedCity.descripcion.trim().endsWith('.')
                        ? selectedCity.descripcion
                        : `${selectedCity.descripcion}.`}</p>
                    <input
                        type="text"
                        placeholder={`Busca restaurantes en ${selectedCity.nombre}`}
                        className="search-bar"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Restaurante;
