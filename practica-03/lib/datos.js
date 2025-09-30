export async function getAlbumes() {
    const albumes = "http://localhost:3000/api/album";

    const rawData = await fetch(albumes);
    const json = await rawData.json();

    return json.map((item) => {
        const {id, nombre, año_publicacion} = item;

        return {
            id,
            nombre,
            año_publicacion
        };
    });
    
}

export async function getArtistas() {
    const artistas = "http://localhost:3000/api/artista";

    const rawData = await fetch(artistas);
    const json = await rawData.json();

    return json.map((item) => {
        const {id, nombre, año_nacimiento} = item;

        return {
            id,
            nombre,
            año_nacimiento
        };
    });
    
}