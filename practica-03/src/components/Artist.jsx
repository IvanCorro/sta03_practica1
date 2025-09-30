import { useState } from 'react';
import './Artist.css';

function Artist({ nombre, año_nacimiento, pais }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="artist-card">
      <h3 className="artist-name">{nombre}</h3>
      
      <button 
        className="info-button"
        onClick={() => setShowInfo(!showInfo)}
      >
        {showInfo ? 'Menos información' : 'Más información'}
      </button>

      {showInfo && (
        <div className="artist-info">
          <p><strong>Año nacimiento:</strong> {año_nacimiento || 'No especificado'}</p>
        </div>
      )}
    </div>
  );
}

export default Artist;