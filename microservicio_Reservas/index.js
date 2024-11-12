require('dotenv').config()
const express = require('express')
const app = express()
const port = 6000
const axios = require('axios')

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
        telefono: restaurante.display_phone,
        
      }
    })

    res.json(restaurantes)

    console.log("Elementos recividos correctamente")
  } catch (error) {
    res.status(500).json({error: 'Error obteniendo restaurantes'})
    console.log("Error finding restaurants in " + req.params.city + ": " + error.message)
  }
})

app.listen(port, () => {
    console.log("Servidor escuchando en puerto " + port)
})