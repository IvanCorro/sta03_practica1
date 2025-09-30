import { useState } from 'react';
import './Album.css';

function Album({ nombre, año_publicacion, artistas }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="album-card">
      <h3 className="album-name">{nombre}</h3>
      
      <button 
        className="info-button"
        onClick={() => setShowInfo(!showInfo)}
      >
        {showInfo ? 'Menos información' : 'Más información'}
      </button>

      {showInfo && (
        <div className="album-info">
          <p><strong>Año publicación:</strong> {año_publicacion}</p>
          <p><strong>Artistas:</strong> {artistas.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default Album;