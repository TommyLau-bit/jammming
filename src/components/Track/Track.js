// src/components/Track/Track.js
import React from 'react';
import './Track.css';

function Track({name, artist, album, onAdd, isRemoval}) {
    const handleAdd = () => {
        if (onAdd) {
          onAdd({ id, name, artist, album });
        }
      };
      
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
      </div>
      {!isRemoval && <button onClick={handleAdd}>+</button>}
    </div>
  );
}

export default Track;