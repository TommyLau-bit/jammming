const clientId = 'e3b89db30ff0490f8e36234ad34b03c1'; // Your Spotify Client ID
const redirectUri = 'http://localhost:3000/'; // Your app's redirect URI
let accessToken;

const Spotify = {
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

  search(term) {
    const token = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
};

export default Spotify;