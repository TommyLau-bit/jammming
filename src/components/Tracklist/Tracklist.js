// src/components/Tracklist/Tracklist.js
import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track';

function Tracklist({tracks, onAdd, isRemoval}) {
  return (
    <div className="Tracklist">
        {tracks.map(track => (
      <Track key={track.id} 
             name={track.name} 
             artist={track.artist} 
             album={track.album} 
             onAdd={onAdd}
             isRemoval={isRemoval}/>
        ))}
    </div>
  );
}

export default Tracklist;