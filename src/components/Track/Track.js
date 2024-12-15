// src/components/Track/Track.js
import React from 'react';
import './Track.css';

function Track({id, name, artist, album, onAdd, onRemove, isRemoval}) {
    const handleAdd = () => {
        if (onAdd) {
          onAdd({ id, name, artist, album });
        }
      };
      const handleRemove = () => {
        if (onRemove) {
          onRemove(id);
        }
      };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
      </div>
      {isRemoval ? (
        <button onClick={handleRemove}>-</button> // Remove button
      ) : (
        <button onClick={handleAdd}>+</button> // Add button
      )}
    </div>
  );
}

export default Track;