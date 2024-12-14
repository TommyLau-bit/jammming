// src/components/Track/Track.js
import React from 'react';
import './Track.css';

function Track({id,name, artist, album}) {
    console.log(id);
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
      </div>
      <button>+</button>
    </div>
  );
}

export default Track;