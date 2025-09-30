import { useState, useEffect } from 'react';
import Artist from './components/Artist';
import Album from './components/Album';
import './App.css';
import { getAlbumes, getArtistas } from '../lib/datos';

function App() {
  const [loading, setLoading] = useState(true);
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    // Cargar álbumes y artistas en paralelo
    Promise.all([getAlbumes(), getArtistas()])
      .then(([albumes, artistas]) => {
        const adaptedData = [
          {
            title: "Álbumes",
            type: "albums",
            items: albumes
          },
          {
            title: "Artistas",
            type: "artists",
            items: artistas
          }
        ];

        setMusicData(adaptedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error cargando datos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Cargando catálogo musical de Iván y Gaby...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 Catálogo Musical</h1>
        <p>Descubre artistas y álbumes</p>
      </header>

      <main className="main-content">
        {musicData.map((category, index) => (
          <section key={index} className="music-section">
            <h2 className="section-title">{category.title}</h2>
            <div className="horizontal-scroll">
              {category.items.map(item =>
                category.type === "artists" ? (
                  <Artist
                    key={item.id}
                    nombre={item.nombre}
                    año_nacimiento={item.año_nacimiento}
                  />
                ) : (
                  <Album
                    key={item.id}
                    nombre={item.nombre}
                    año_publicacion={item.año_publicacion}
                    artistas={item.artistas}
                  />
                )
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;