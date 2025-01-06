import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../CSS/Favoritos.css";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Favorites = () => {
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

    const fetchFavoriteRestaurants = () => {
        axios
            .get("/api/auth/favorite-restaurants/all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                const restaurantPromises = response.data.map((favorite) =>
                    axios
                        .get(`/api/restaurants/id/${favorite.restaurantID}`)
                        .then((res) => ({
                            ...res.data,
                            isFavorite: true, // Inicializamos el estado de favorito como verdadero
                        }))
                );

                Promise.all(restaurantPromises)
                    .then((restaurants) => {
                        setFavoriteRestaurants(restaurants);
                    })
                    .catch((error) => {
                        console.error("Error getting favorite restaurant:", error);
                    });
            })
            .catch((error) => {
                console.error("Error getting favorite restaurant:", error);
            });
    };

    useEffect(() => {
        fetchFavoriteRestaurants(); // Carga inicial de los favoritos
    }, []);

    const toggleFavorite = async (restaurantId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Token no encontrado. Por favor, inicia sesión.");
                return;
            }

            const updatedRestaurants = favoriteRestaurants.map((restaurant) => {
                if (restaurant.id === restaurantId) {
                    if (restaurant.isFavorite) {
                        axios.delete("http://localhost:8000/auth/favorite-restaurants/delete", {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            data: { restaurant: restaurant.id },
                        });
                        return { ...restaurant, isFavorite: false };
                    } else {
                        axios.post(
                            "http://localhost:8000/auth/favorite-restaurants/add",
                            { restaurant: restaurant.id },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        return { ...restaurant, isFavorite: true };
                    }
                }
                return restaurant;
            });

            setFavoriteRestaurants(updatedRestaurants);
        } catch (error) {
            console.error("Error cambiando el estado de favorito:", error);
        }
    };

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
                        <div className="restaurant-card" key={restaurant.id}>
                            <h3>{restaurant.nombre}</h3>
                            <p>
                                <strong>Nombre:</strong> {restaurant.name}
                            </p>
                            <p>
                                <strong>Barrio:</strong> {restaurant.barrio} km
                            </p>
                            <p>
                                <strong>Ciudad:</strong> {restaurant.ciudad}
                            </p>
                            <div className="actions">
                                {/* Botón "Ver detalles" */}
                                <Link
                                    to={`/restaurants/name/${restaurant.name}`}
                                    className="details-button"
                                >
                                    Ver detalles
                                </Link>
                                {/* Ícono de favorito */}
                                <div
                                    className="favorite-icon"
                                    onClick={() => toggleFavorite(restaurant.id)}
                                >
                                    {restaurant.isFavorite ? (
                                        <FaHeart color="red" size={24} />
                                    ) : (
                                        <FaRegHeart color="red" size={24} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Botón de recargar */}
            <div className="reload-container">
                <button className="reload-button" onClick={fetchFavoriteRestaurants}>
                    Recargar
                </button>
            </div>
        </div>
    );
};

export default Favorites;
