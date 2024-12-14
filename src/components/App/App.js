// src/components/App/App.js
import React, { useState } from 'react'; // Added useState import
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
   // eslint-disable-next-line
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Song A', artist: 'Artist A', album: 'Album A' },
    { id: 2, name: 'Song B', artist: 'Artist B', album: 'Album B' },
    { id: 3, name: 'Song C', artist: 'Artist C', album: 'Album C' },
  ]);

  const [playlistName, setPlaylistName] = useState('New Playlist');
     // eslint-disable-next-line
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Method to add a track to the playlist
  const addTrack = (track) => {
    // Check if the track is already in the playlist
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    // Add the track to the playlist
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  };



  return (
    <div className="App">
      <h1>Jammming</h1>
      <div className="App-content">
        <SearchBar />
        <div className="App-main">
          <SearchResults searchResults={searchResults} onAdd={addTrack}/>
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            setPlaylistName={setPlaylistName}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

