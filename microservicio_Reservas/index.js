require('dotenv').config()
const express = require('express')
const app = express()
const port = 7000
const axios = require('axios')
const mongoose = require('mongoose')
const connectDB = require('./config/db');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

connectDB();

const RestauranteSchema = new mongoose.Schema({
  id: String,
  name: String, 
  abierto: Boolean,
  categorias: Array,
  barrio: String,
  ciudad: String,
  telefono: String
})

const Restaurante = mongoose.model('Restaurante', RestauranteSchema)

async function uploadData(restaurantes, ciudad) {
  try {
    const restaurantesBBDD = await Restaurante.find();

    if (restaurantesBBDD.length > 0) {
      for (const restaurante of restaurantesBBDD) {
        if (restaurante['ciudad'] === ciudad) {
          await Restaurante.deleteOne(restaurante);
        }
      }
    }

    const restaurantesParaInsertar = restaurantes.map(restaurante => ({
      id: restaurante['id'],
      name: restaurante['name'],
      abierto: restaurante['abierto'],
      categorias: restaurante['categorias'],
      barrio: restaurante['barrio'],
      ciudad: restaurante['ciudad'],
      telefono: restaurante['telefono']
    }))

    await Restaurante.insertMany(restaurantesParaInsertar);

    console.log('Restaurantes añadidos a la base de datos')
  } catch(error){
    console.error('Error al cargar los datos ' + error)
  }
}

/**
 * @swagger
 * /restaurants/city/{city}:
 *   get:
 *     description: Get the data from the database by city
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The city of the restaurant
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurante'
 *       404:
 *         description: Restaurante not found
 *       500:
 *         description: Error retrieving the data
 */

app.get('/restaurants/city/:city', async (req, res) => {
  try {
    const city = req.params.city
    const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`
    
    const response = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}` // Reemplaza con tu clave de API de Yelp
      }
    })
    const data = response.data

    const restaurantes = data.businesses.map(restaurante => {
      return {
        id: restaurante.id,
        name: restaurante.name, 
        abierto: restaurante.is_closed,
        categorias: restaurante.categories,
        barrio: restaurante.location.address1,
        ciudad: restaurante.location.city,
        telefono: restaurante.display_phone
      }
    })

    uploadData(restaurantes, city)

    res.json(restaurantes)

    console.log("Elementos recividos correctamente")
  } catch (error) {
    res.status(500).json({error: 'Error obteniendo restaurantes'})
    console.log("Error finding restaurants in " + req.params.city + ": " + error.message)
  }
})

/**
 * @swagger
 * /restaurants/id/{restauranteID}:
 *   get:
 *     description: Get the data from the database by ID
 *     parameters:
 *       - in: path
 *         name: restauranteID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the restaurant
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurante'
 *       404:
 *         description: Restaurante not found
 *       500:
 *         description: Error retrieving the data
 */

app.get('/restaurants/id/:restauranteID', async (req, res) => {
  try {
      const restaurante = await Restaurante.findOne({ id: req.params.restauranteID });
      if (!restaurante) {
          return res.status(404).json({ error: "Restaurante no encontrado" });
      }
      res.json(restaurante);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /restaurants/name/{restauranteName}:
 *   get:
 *     description: Get the data from the database by name
 *     parameters:
 *       - in: path
 *         name: restauranteName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the restaurant
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurante'
 *       404:
 *         description: Restaurante not found
 *       500:
 *         description: Error retrieving the data
 */

app.get('/restaurants/name/:restauranteName', async (req, res) => {
  try {
      const restaurante = await Restaurante.findOne({ name: req.params.restauranteName });
      if (!restaurante) {
          return res.status(404).json({ error: "Restaurante no encontrado" });
      }
      res.json(restaurante);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /restaurants/getCategories:
 *   get:
 *     description: Get the categories from the database 
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/categoria'
 *       404:
 *         description: Restaurante not found
 *       500:
 *         description: Error retrieving the data
 */

app.get('/restaurants/getCategories', async (req, res) => {
  try {
    const restaurantesBBDD = await Restaurante.find();

    const categorias = []

    for (let restaurante of restaurantesBBDD) {
      for (let categoria of restaurante['categorias']) {
        if (!categorias.includes(categoria.title)) {
          categorias.push(categoria.title);
        }
      }
    }

    res.send(categorias)
    console.log('Categorías devueltas correctamente')

  } catch (error) {
    res.status(500).json('Error obteniendo categorías')
    console.log("error al obtener todas las categorias: " + error)
  }
})

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'Restaurants API',
          version: '1.0.0',
          description: 'Restaurants API documentation',
      },
      components: {
          schemas: {
              Restaurant: {
                  type: 'object',
                  properties: {
                      id: { type: 'string' },
                      abierto: { type: 'boolean' },
                      categorias: { type: 'array' },
                      name: { type: 'string' },
                      barrio: { type: 'string' },
                      ciudad: { type: 'string' },
                      telefono: { type: 'string' },
                  },
              },
              categoria:{
                type: 'string'
              }
          },
      },
  },
  apis: [__filename],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Agregar Swagger a Express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log("Servidor escuchando en puerto " + port)
})