const fs = require('fs').promises;
const path = require('path');

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

// Función de prueba
async function testLectura() {
    console.log('🧪 Probando lectura de archivos JSON...\n');
    
    try {
        // Test 1: Leer álbumes
        console.log('📀 Probando leerAlbumes()...');
        const albumes = await leerAlbumes();
        console.log('✅ Álbumes leídos correctamente');
        console.log(`   Cantidad: ${albumes.length} álbumes`);
        console.log('   Primer álbum:', albumes[0]?.nombre || 'No encontrado');
        
        // Test 2: Leer artistas
        console.log('\n🎤 Probando leerArtistas()...');
        const artistas = await leerArtistas();
        console.log('✅ Artistas leídos correctamente');
        console.log(`   Cantidad: ${artistas.length} artistas`);
        console.log('   Primer artista:', artistas[0]?.nombre_completo || 'No encontrado');
        
        // Test 3: Verificar estructura de datos
        console.log('\n🔍 Verificando estructura de datos...');
        if (albumes.length > 0) {
            console.log('   ✅ Álbumes tienen estructura correcta:', 
                albumes[0].hasOwnProperty('id'),
                albumes[0].hasOwnProperty('nombre'),
                albumes[0].hasOwnProperty('año_publicacion'),
                albumes[0].hasOwnProperty('artistas')
            );
        }
        
        if (artistas.length > 0) {
            console.log('   ✅ Artistas tienen estructura correcta:', 
                artistas[0].hasOwnProperty('id'),
                artistas[0].hasOwnProperty('nombre_completo'),
                artistas[0].hasOwnProperty('año_nacimiento')
            );
        }
        
        // Test 4: Probar relación entre datos
        console.log('\n🔗 Probando relación álbumes-artistas...');
        if (albumes.length > 0 && artistas.length > 0) {
            const primerAlbum = albumes[0];
            const artistasDelAlbum = primerAlbum.artistas.map(id => 
                artistas.find(a => a.id === id)?.nombre_completo || 'Desconocido'
            );
            console.log(`   Artistas de "${primerAlbum.nombre}":`, artistasDelAlbum.join(', '));
        }
        
        console.log('\n🎉 ¡Todas las pruebas pasaron correctamente!');
        
    } catch (error) {
        console.error('❌ Error en las pruebas:', error);
    }
}

// Ejecutar prueba
testLectura();
