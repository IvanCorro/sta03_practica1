
const express = require('express');
const app = express();
app.use(express.json());
//Leer los txt (nuestra base de datos)
const dataPath = path.join(__dirname, 'data');

async function leerAlbumes() {
    try {
        const data = await fs.readFile(path.join(dataPath, 'albumes.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo albumes:', error);
        return [];
    }
}

async function leerArtistas() {
    try {
        const data = await fs.readFile(path.join(dataPath, 'artistas.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo artistas:', error);
        return [];
    }
}
//donde se configuran los endpoints (la API en si)


//establecer los puertos por los que accederemos
const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening - port ${port}`));

//luego pongo node index.js y voy a postman y hago la peticion de lo que quiero http://localhost/api/..