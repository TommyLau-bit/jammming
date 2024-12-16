// src/components/Tracklist/Tracklist.js
import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track';

function Tracklist({tracks, onAdd, onRemove, isRemoval}) {
    console.log('Tracks in Tracklist:', tracks);
  return (
    <div className="Tracklist">
        {tracks.map(track => (
      <Track key={track.id} 
             id={track.id}
             name={track.name} 
             artist={track.artist} 
             album={track.album} 
             onAdd={onAdd}
             onRemove={onRemove}
             isRemoval={isRemoval}/>
        ))}
    </div>
  );
}

export default Tracklist;