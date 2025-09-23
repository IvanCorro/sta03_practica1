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

//donde se configuran los endpoints (la API en si)

app.get('/', (req, res) => {
    res.send('Node JS api musical Iván y Gaby');
});
    //ALBUMES
app.get('/api/album/:nombre', async (req, res) => {
    const albumes = await leerAlbumes();
    const album = albumes.find(c => c.nombre === req.params.nombre);
    if (!album) return res.status(404).send('Album no encontrado');
    res.send(album);
});

app.post('/api/album', async (req, res) => {
    const albumes = await leerAlbumes();
    const album = {
        id: albumes.length + 1,
        nombre: req.body.nombre,
        año_publicacion: parseInt(req.body.año_publicacion),
        artistas: req.body.artistas || [],
    };
    albumes.push(album);
    await guardarAlbumes(albumes);
    res.send(album);
});

app.delete('/api/album/:nombre', async (req, res) => {
    let albumes = await leerAlbumes();
    const album = albumes.find(c => c.nombre === req.params.nombre);
    if (!album) return res.status(404).send('Album no encontrado');

    albumes = albumes.filter(c => c.nombre !== album.nombre);
    await guardarAlbumes(albumes);
    res.send(album);
});

app.patch('/api/album/:nombre', async (req, res) => {
    const albumes = await leerAlbumes();
    const album = albumes.find(c => c.nombre === req.params.nombre);
    if (!album) return res.status(404).send('Album no encontrado'); 

    // Actualizar solo los campos enviados en el body
    if (req.body.nombre !== undefined) album.nombre = req.body.nombre;
    if (req.body.año_publicacion !== undefined) album.año_publicacion = parseInt(req.body.año_publicacion);
    if (req.body.artistas !== undefined) album.artistas = req.body.artistas;

    await guardarAlbumes(albumes);
    res.send(album);

});

    //ARTISTAS
app.get('/api/artista/:id', async (req, res) => {
    const artistas = await leerArtistas();
    const artista = artistas.find(c => c.id === parseInt(req.params.id));
    if (!artista) return res.status(404).send('Artista no encontrado');
    res.send(artista);
});

app.post('/api/artista', async (req, res) => {
    const artistas = await leerArtistas();    
    const artista = {
        id: artistas.length + 1,
        nombre: req.body.nombre,
        año_nacimiento: parseInt(req.body.año_nacimiento),
    };
    //crear nuevo artista
    artistas.push(artista);
    await guardarArtistas(artistas);
    res.send(artista);
});

app.delete('/api/artista/:nombre', async (req, res) => {
    let artistas = await leerArtistas();
    const artista = artistas.find(c => c.nombre === req.params.nombre);
    if (!artista) return res.status(404).send('Artista no encontrado');

    artistas = artistas.filter(c => c.nombre !== artista.nombre);
   
    await guardarArtistas(artistas);
    res.send(artista);
});

app.patch('/api/artista/:nombre', async (req, res) => {
    let artistas = await leerArtistas();
    const artista = artistas.find(c => c.nombre === req.params.nombre);
    if (!artista) return res.status(404).send('Artista no encontrado');

    if (req.body.nombre !== undefined) artista.nombre = req.body.nombre;
    if (req.body.año_nacimiento !== undefined) artista.año_nacimiento = parseInt(req.body.año_nacimiento);
    if (req.body.artistas !== undefined) artista.artistas = req.body.artistas;

    await guardarArtistas(artistas);
    res.send(artista);
});
//establecer los puertos por los que accederemos
const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening - port ${port}`));

//luego pongo node index.js y voy a postman y hago la peticion de lo que quiero http://localhost/api/..