const express = require('express');
const fs = require('fs').promises;
const app = express();

app.use(express.json());

async function leerArtistas(){
    await fs.access('./data/artistas.json')
    const data = await fs.readFile('./data/artistas.json', 'utf8');
    const artistas = JSON.parse(data);
    return artistas;
}

async function guardarArtistas(artistas){
    await fs.access('./data/artistas.json');
    const data = JSON.stringify(artistas, null, 2);
    await fs.writeFile('./data/artistas.json', data, 'utf8');
}
async function leerAlbumes(){
    await fs.access('./data/albumes.json')
    const data = await fs.readFile('./data/albumes.json', 'utf8');
    const albumes = JSON.parse(data);
    return albumes;
}

async function guardarAlbumes(albumes){
    await fs.access('./data/albumes.json');
    const data = JSON.stringify(albumes, null, 2);
    await fs.writeFile('./data/albumes.json', data, 'utf8');
}

//Donde se configuran los endpoints (la API en si)
app.get('/', (req, res) => {
    res.send('Node JS api musical Iván y Gaby');
});

//ALBUMES
app.get('/api/album', async (req, res) => {
    const albumes = await leerAlbumes();
    res.send(albumes);
});

app.get('/api/album/:nombre', async (req, res) => {
    const albumes = await leerAlbumes();
    const artistas = await leerArtistas();
    const album = albumes.find(c => c.nombre === req.params.nombre);

    if (!album) return res.status(404).send('Album no encontrado');

    for(let i = 0; i < album.artistas.length; i++){
        let id_artista = album.artistas[i];
        const artista = artistas.find(c => c.id === id_artista);
        album.artistas[i] = artista.nombre;
    }

    res.send(album);
});

app.post('/api/album', async (req, res) => {
    let albumes = await leerAlbumes();
    let artistas = await leerArtistas();

    const album = {
        id: albumes.length + 1,
        nombre: req.body.nombre,
        año_publicacion: parseInt(req.body.año_publicacion),
        artistas: req.body.artistas || [],
    };

    if (albumes.find(c => c.nombre === album.nombre)) return res.status(405).send('Ese album ya está registrado');

    for(let i = 0; i < album.artistas.length; i++){
        let nombre_artista = album.artistas[i];

        if(artistas.find(c => c.nombre === nombre_artista)){
            const artista_elegido = artistas.find(c => c.nombre === nombre_artista);
            let id_artista = artista_elegido.id;
            album.artistas[i] = id_artista;
        }else{
            const artista = {
                id: artistas.length + 1,
                nombre: nombre_artista,
                año_nacimiento: 0,
            };
            album.artistas[i] = artista.id;
            artistas.push(artista);
            await guardarArtistas(artistas);
        }
    }

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
app.get('/api/artista', async (req, res) => {
    const artistas = await leerArtistas();
    res.send(artistas);
});

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

    await guardarArtistas(artistas);
    res.send(artista);
});

//establecer los puertos por los que accederemos
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en puerto ${port}`));

//luego pongo node index.js y voy a postman y hago la peticion de lo que quiero http://localhost/api/..