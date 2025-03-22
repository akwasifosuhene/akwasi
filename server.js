const clientId = '82910fe423f24953a93aa6188fd25c58'; // ENTER YOUR CLIENT ID HERE
const redirectUri = 'https://jrakwasi.github.io/akwasi/'; // ENTER YOUR REDIRECT URI HERE

async function generatePlaylist() {
    const songList = document.getElementById('songs').value.split(',');
    const accessToken = new URLSearchParams(window.location.search).get('access_token');
    const userId = 'YOUR_SPOTIFY_USER_ID'; // Replace with your Spotify user ID

    const trackUris = await getTrackUris(accessToken, songList);
    displayPreview(trackUris);
}

async function getTrackUris(accessToken, songList) {
    const searchUrl = 'https://api.spotify.com/v1/search';
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    const trackUris = [];
    for (const song of songList) {
        const response = await fetch(`${searchUrl}?q=${encodeURIComponent(song)}&type=track&limit=1`, { headers });
        const data = await response.json();
        if (data.tracks.items.length > 0) {
            trackUris.push(data.tracks.items[0].uri);
        }
    }
    return trackUris;
}

function displayPreview(trackUris) {
    const previewDiv = document.getElementById('preview');
    previewDiv.innerHTML = '<h2>Preview</h2>';
    trackUris.forEach(uri => {
        const trackElement = document.createElement('p');
        trackElement.textContent = uri;
        previewDiv.appendChild(trackElement);
    });
}
