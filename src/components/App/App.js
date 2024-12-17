// src/components/App/App.js
import React, { useState } from 'react'; // Added useState import
import './App.css';
import '../../styles/utilities.css';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../utilities/Spotify'; // Import Spotify module
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
   // eslint-disable-next-line
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
     // eslint-disable-next-line
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    console.log('Track URIs to save:', trackUris); // Debugging line

    if (!trackUris || trackUris.includes(undefined)) {
      console.error('One or more tracks have invalid URIs.');
      return;
    }
    Spotify.savePlaylist(playlistName, trackUris)
      .then(() => {
        setPlaylistName('New Playlist');
        setPlaylistTracks([]);
        console.log('Playlist saved to Spotify!');
      })
      .catch((error) => {
        console.error('Failed to save playlist:', error);
      });
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
    setPlaylistTracks((prevTracks) => {
      const updatedTracks = prevTracks.filter((track) => track.id !== trackId);
      console.log('Updated playlistTracks:', updatedTracks);
      return updatedTracks;
    });
  };

  const search = async (term) => {
    if (!term) return; // Prevent empty searches
  
    console.log('Searching for:', term.toLowerCase()); // Debugging step
  
    try {
      const results = await Spotify.search(term.toLowerCase()); // Convert term to lowercase
      console.log('Search results:', results); // Debugging log
      setSearchResults(results); // Update search results immediately
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="App">
      <h1>Jammming</h1>
      <div className="App-content">
        <SearchBar onSearch={search}/>
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

