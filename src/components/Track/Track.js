// src/components/Track/Track.js
import React from 'react';
import './Track.css';

function Track({id, name, artist, album, uri,  onAdd, onRemove, isRemoval}) {
    const handleAdd = () => {
        if (onAdd) {
          onAdd({ id, name, artist, album, uri});
        }
      };
      const handleRemove = () => {
        console.log('Removing track with id:', id); // Debugging
        if (onRemove) {
          onRemove(id, name, artist, album);
        }
      };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
      </div>
      {isRemoval ? (
        <button className="Track-action" onClick={handleRemove}>-</button> // Remove button
      ) : (
        <button className="Track-action" onClick={handleAdd}>+</button> // Add button
      )}
    </div>
  );
}

export default Track;