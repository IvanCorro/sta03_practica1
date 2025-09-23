
const express = require('express');
const fs = require('fs').promises;
const app = express();

app.use(express.json());

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

async function readAlbumes() {
    const data = await fs.readFile('albumes.json', 'utf8');
    return JSON.parse(data);
}

async function saveAlbumes(albumes) {
    await fs.writeFile('albumes.json', JSON.stringify(albumes, null, 4));
}

async function readArtistas() {
    const data = await fs.readFile('artistas.json', 'utf8');
    return JSON.parse(data);
}

async function saveArtistas(artistas) {
    await fs.writeFile('artistas.json', JSON.stringify(artistas, null, 4));
}

//donde se configuran los endpoints (la API en si)
app.get('/', (req, res) => {
    res.send('Node JS api musical Iván y Gaby');
});

app.get('/api/album/:nombre', async (req, res) => {
    const albumes = await readAlbumes();
    const album = albumes.find(c => c.nombre === req.params.nombre);
    if (!album) return res.status(404).send('Album no encontrado');
    res.send(album);
});

app.post('/api/album', async (req, res) => {
    const albumes = await readAlbumes();
    const album = {
        id: albumes.length + 1,
        nombre: req.body.nombre,
        año_publicacion: parseInt(req.body.año_publicacion),
        artistas: req.body.artistas || [],
    };
    albumes.push(album);
    await saveAlbumes(albumes);
    res.send(album);
});

app.delete('/api/album/:nombre', async (req, res) => {
    const albumes = await readAlbumes();
    const album = albumes.find(c => c.nombre === req.params.nombre);
    if (!album) return res.status(404).send('Album no encontrado');

    albumes = albumes.filter(c => c.nombre !== album.nombre);
    await saveAlbumes(albumes);
    res.send(album);
});

app.patch('/api/album/:nombre', async (req, res) => {
    const albumes = await readAlbumes();
    const album = albumes.find(c => c.nombre === req.params.nombre);
    if (!album) return res.status(404).send('Album no encontrado'); 

    // Actualizar solo los campos enviados en el body
    if (req.body.nombre !== undefined) album.nombre = req.body.nombre;
    if (req.body.año_publicacion !== undefined) album.año_publicacion = parseInt(req.body.año_publicacion);
    if (req.body.artistas !== undefined) album.artistas = req.body.artistas;

    await saveAlbumes(albumes);
    res.send(album);

});

//ARTISTAS
app.post('/api/artista', async (req, res) => {
    const artistas = await leerArtistas();    
    const artista = {
        id: artistas.length + 1,
        nombre_completo: req.body.nombre_completo,
        año_nacimiento: parseInt(req.body.año_nacimiento),
    };
    //crear nuevo artista
    artistas.push(artista);
    await guardarArtistas(artistas);
    res.send(artista);
});
app.delete('/api/artista/:nombre_completo', async (req, res) => {
    const artistas = await leerArtistas();
    const {nombre_completo} = req.params;
    //buscar índice del artista
    const artista_index = artistas.findIndex(a => a.nombre_completo.toLowerCase() === nombre_completo.toLowerCase());
    //eliminar el artista que contenga ese indice buscado
    const artista_eliminado = artistas.splice(artista_index, 1)[0];
    await guardarArtistas(artistas);
    res.send(artista_eliminado);

});

//establecer los puertos por los que accederemos
const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening - port ${port}`));

//luego pongo node index.js y voy a postman y hago la peticion de lo que quiero http://localhost/api/..