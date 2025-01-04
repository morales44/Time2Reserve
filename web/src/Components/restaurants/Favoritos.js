import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../CSS/Favoritos.css";
import { Link } from "react-router-dom";

const Favorites = () => {
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

    useEffect(() => {
        axios.get('/api/auth/favorite-restaurants/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                console.log(response)
                const restaurantPromises = response.data.map(favorite =>
                    axios.get(`/api/restaurants/id/${favorite.restaurantID}`)
                        .then(res => res.data)
                );

                Promise.all(restaurantPromises)
                    .then(restaurants => {
                        setFavoriteRestaurants(restaurants);
                    })
                    .catch(error => {
                        console.error('Error getting favorite restaurant:', error);
                    });
            })
            .catch(error => {
                console.error('Error getting favorite restaurant:', error);
            });
    }, []);

    return (
        <div className="favorites">
            <div className="favorites-header">
                <h1>Restaurantes favoritos</h1>
            </div>

            <div className="favorites-elements">
                {favoriteRestaurants.length === 0 ? (
                    <p>No hay restaurantes favoritos.</p>
                ) : (
                    favoriteRestaurants.map((restaurant) => (
                        <div className="restaurant-card">
                            <h3>{restaurant.nombre}</h3>
                            <p><strong>Nombre:</strong> {restaurant.name}</p>
                            <p><strong>Barrio:</strong> {restaurant.barrio} km</p>
                            <p><strong>Ciudad:</strong> {restaurant.ciudad}</p>
                            <Link to={`/restaurants/${restaurant.id}`} className="details-button">
                                Ver detalles
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Favorites;
