const clientId = 'e3b89db30ff0490f8e36234ad34b03c1'; // Your Spotify Client ID
const redirectUri = 'http://localhost:3000/'; // Your app's redirect URI
let accessToken;

const Spotify = {
    // 1. Get Access Token
  getAccessToken() {
    // Return the token if it already exists
    if (accessToken) {
      return accessToken;
    }

    // Check if the access token is in the URL
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      // Extract and store the token and expiration time
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Clear the token after it expires
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);

      // Remove token parameters from the URL
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      // Redirect the user to Spotify's authorization page if no token is found
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${encodeURIComponent(
        redirectUri
      )}`;
      window.location = authUrl;
    }
  },

  // 2. Playlist Management
    // Get the current user's Spotify ID
getUserId() {
  const token = this.getAccessToken();

  return fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to get user ID: ${response.status}`);
      }
      return response.json();
    })
    .then((jsonResponse) => jsonResponse.id)
    .catch((error) => {
      console.error('Error fetching user ID:', error);
      return null; // Return null if the user ID cannot be fetched
    });
},
  // Create a new playlist
  createPlaylist(userId, playlistName) {
    const token = this.getAccessToken();
  
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playlistName,
        description: 'Created with Jammming',
        public: true,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to create playlist: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonResponse) => jsonResponse.id)
      .catch((error) => {
        console.error('Error creating playlist:', error);
        return null; // Return null if the playlist cannot be created
      });
  },
  // Add tracks to a playlist
  addTracksToPlaylist(playlistId, trackUris) {
    if (!trackUris || trackUris.length === 0) {
        console.error('No track URIs provided to add to the playlist');
        return Promise.reject('Track URIs array is empty');
      }
    
      console.log('Adding these track URIs:', trackUris); // Debugging line
    const token = this.getAccessToken();

    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: trackUris,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to add tracks to playlist: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error adding tracks to playlist:', error);
      });
  },
  // Save playlist by combining the above methods
  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      console.error('Playlist name or track URIs are missing');
      return Promise.reject('Playlist name or track URIs are missing');
    }
  
    return this.getUserId()
      .then((userId) => {
        if (!userId) {
          throw new Error('User ID is null or undefined');
        }
        return this.createPlaylist(userId, playlistName);
      })
      .then((playlistId) => {
        if (!playlistId) {
          throw new Error('Playlist ID is null or undefined');
        }
        return this.addTracksToPlaylist(playlistId, trackUris);
      })
      .catch((error) => {
        console.error('Error saving playlist:', error);
      });
  },

  // 3. Search Functionality
  search(term) {
    const token = this.getAccessToken();

    if (!term) {
      console.error('Search term is required');
      return Promise.resolve([]);
    }

    // Perform a search request
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Spotify API request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }

        // Map tracks to the required format
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      })
      .catch((error) => {
        console.error('Error fetching data from Spotify:', error);
        return [];
      });
  },
};

export default Spotify;