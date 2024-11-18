
-- Comprobar si existe la base de datos y eliminarla si es necesario
DROP DATABASE IF EXISTS time2reserve;

-- Crear la base de datos bicitech
CREATE DATABASE time2reserve;

-- Usar la base de datos bicitech
USE time2reserve;

-- Comprobar si existe la tabla user y eliminarla si es necesario
DROP TABLE IF EXISTS user;

-- Crear la tabla user
CREATE TABLE user (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    username VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL
);

-- Comprobar si existe la tabla favoriteRoads y eliminarla si es necesario
DROP TABLE IF EXISTS favoriteRestaurants;

-- Crear la tabla favoriteRoads
CREATE TABLE favoriteRestaurants (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL,
    restaurantID VARCHAR(45) NOT NULL
);
