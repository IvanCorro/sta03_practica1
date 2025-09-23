
//Configuración inicial
const express = require('express'); //libreria que hemos instalado
const fs = require('fs').promises;
const app = express();
app.use(express.json()); //nuestra variable app del tipo express va a utilizar json
//Leer los txt (nuestra base de datos)
async function leerArtistas(){
    await fs.access('artistas.json')
    const data = await fs.readFile('artistas.json', 'utf8');
    const artistas = JSON.parse(data);
    return artistas;
}

async function guardarArtistas(artistas){
    await fs.access('artistas.json');
    const data = JSON.stringify(artistas, null, 2);
    await fs.writeFile('artistas.json', data, 'utf8');
}
async function leerAlbumes(){
    await fs.access('albumes.json')
    const data = await fs.readFile('albumes.json', 'utf8');
    const albumes = JSON.parse(data);
    return albumes;
}

async function guardarAlbumes(albumes){
    await fs.access('albumes.json');
    const data = JSON.stringify(albumes, null, 2);
    await fs.writeFile('albumes.json', data, 'utf8');
}
//donde se configuran los endpoints (la API en si)
    //ALBUMES

    //ARTISTAS
    app.post('/api/artista', async (req, res) => {
        const {nombre_completo, año_nacimiento } = req.body; //esta info nos la tienen que pasar en Body
        //crear nuevo artista
        artistas.push({nombre_completo,año_nacimiento});
        await guardarArtistas(artistas);
    });
    app.delete('/api/artista/:nombre_completo', async (req, res) => {
        const {nombre_completo} = req.params;
        const artistas = await leerArtistas();
        //buscar índice del artista
        const artista_index = artistas.findIndex(a => a.nombre_completo.toLowerCase === nombre_completo.toLowerCase());
        //eliminar el artista que contenga ese indice buscado
        const artista_eliminado = artistas.splice(artista_index, 1)[0];
        await guardarArtistas(artistas);
    
    });

//establecer los puertos por los que accederemos
const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening - port ${port}`));

//luego pongo node index.js y voy a postman y hago la peticion de lo que quiero http://localhost/api/..