import { useState, useEffect } from 'react';
import Artist from './components/Artist';
import Album from './components/Album';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  // Datos locales - como pide la práctica
  const musicData = [
    {
      title: "🎧 Álbumes",
      type: "albums", 
      items: [
        { id: 1, nombre: "Un Verano Sin Ti", año_publicacion: 2022, artistas: ["Bad Bunny"] },
        { id: 2, nombre: "Saturno", año_publicacion: 2023, artistas: ["Rauw Alejandro"] },
        { id: 3, nombre: "Mañana Será Bonito", año_publicacion: 2023, artistas: ["Karol G"] },
        { id: 4, nombre: "Jose", año_publicacion: 2021, artistas: ["J Balvin"] },
        { id: 5, nombre: "LLNM2", año_publicacion: 2022, artistas: ["Anuel AA"] }
      ]
    },
    {
      title: "🎵 Artistas",
      type: "artists",
      items: [
        { id: 6, nombre: "Rosalía", año_nacimiento: 1993 },
        { id: 7, nombre: "Dua Lipa", año_nacimiento: 1995 },
        { id: 8, nombre: "The Weeknd", año_nacimiento: 1990 }
      ]
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
                    pais={item.pais}
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