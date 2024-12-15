// src/components/App/App.js
import React, { useState } from 'react'; // Added useState import
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
   // eslint-disable-next-line
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Song A', artist: 'Artist A', album: 'Album A', uri: 'spotify:track:123' },
    { id: 2, name: 'Song B', artist: 'Artist B', album: 'Album B', uri: 'spotify:track:456' },
    { id: 3, name: 'Song C', artist: 'Artist C', album: 'Album C', uri: 'spotify:track:789' },
  ]);

  const [playlistName, setPlaylistName] = useState('New Playlist');
     // eslint-disable-next-line
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 4, name: 'Song D', artist: 'Artist D', album: 'Album D', uri: 'spotify:track:101' },
    { id: 5, name: 'Song E', artist: 'Artist E', album: 'Album E', uri: 'spotify:track:202' },
  ]);

  const savePlaylist = () => {
    // Extract the URIs from the playlistTracks
    const trackUris = playlistTracks.map((track) => track.uri);
    console.log('Saving playlist to Spotify:', playlistName, trackUris);

    // Reset the playlist
    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
  };

  // Method to add a track to the playlist
  const addTrack = (track) => {
    // Check if the track is already in the playlist
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }  
    // Add the track to the playlist
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  };

  // Method to remove a track from the playlist
  const removeTrack = (trackId) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((track) => track.id !== trackId)
      );
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
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

