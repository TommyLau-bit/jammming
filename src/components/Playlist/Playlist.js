// src/components/Playlist/Playlist.js
import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({ playlistName, playlistTracks, setPlaylistName, onRemove}) {
    const handleNameChange= (e) => {
        setPlaylistName(e.target.value);
    }
  return (
    <div className="Playlist">
      <input value={playlistName} 
      onChange={handleNameChange}
      placeholder="Enter Playlist Name"
      />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
    </div>
  );
}

export default Playlist;