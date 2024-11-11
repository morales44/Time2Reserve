const express = require('express')
const app = express()
const port = 6000

app.listen(port, () => {
    console.log("Servidor escuchando en puerto " + port)
})


app.get('/yelp/getNegocios', async(req, res) => {
    try {
        const term = req.query.term;
        const location = req.query.location;
        const limit = req.query.limit || 10;

        if (!term || !location) {
            console.error("Es necesario proporcionar 'term' y 'location' en la URL.");
            return;
        }

        const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=${limit}`;


    } catch (error) {
        
    }
});
    

    if (!term || !location) {
        console.error("Es necesario proporcionar 'term' y 'location' en la URL.");
        return;
      }
    
      const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=${limit}`;
      
     
    
        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        // Parsear la respuesta en formato JSON
        const data = await response.json();
        
        // Filtrar y parsear la información más importante de cada negocio
        const negocios = data.businesses.map(negocio => ({
          nombre: negocio.name,
          calificacion: negocio.rating,
          direccion: negocio.location.address1, // Dirección principal
          telefono: negocio.phone,
          url: negocio.url,
          tipoComida: negocio.categories.map(categoria => categoria.title).join(', ') // Unir categorías en un solo string
        }));
    }
}
