// Your Last.fm API key
const apiKey = '14e58cf52a7d8f7bbc5766bac8f5f8b3';
const apiUrl = 'https://ws.audioscrobbler.com/2.0/';

async function searchArtist() {
    const searchInput = document.getElementById('search-input').value.trim();

    if (!searchInput) {
        console.error('Please enter a valid artist name.');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?method=artist.search&artist=${searchInput}&api_key=${apiKey}&format=json`);
        const data = await response.json();

        if (data.error) {
            console.error('API Error:', data.message);
            // Display a user-friendly error message in the UI
            alert('Error fetching data. Please try again later.');
            return;
        }

        displayResults(data.results.artistmatches.artist);
    } catch (error) {
        console.error('Error fetching data:', error);
        // Display a user-friendly error message in the UI
        alert('Error fetching data. Please try again later.');
    }
}

function displayResults(artists) {
    const resultsSection = document.getElementById('results-section');

    // Clear previous results
    resultsSection.innerHTML = '';

    artists.forEach(artist => {
        const artistCard = createArtistCard(artist);
        if (artistCard) {
            resultsSection.appendChild(artistCard);
        }
    });
}

function createArtistCard(artist) {
    console.log('Artist Data:', artist);

    // Check if the artist has images available
    if (!artist.image || !artist.image.length || !artist.image[2]['#text']) {
        console.warn('No image URL available for this artist.');
        return null; // Skip creating the card if no image is available
    }

    const artistCard = document.createElement('div');
    artistCard.classList.add('artist-card');

    // Create an anchor element for the artist name
    const artistLink = document.createElement('a');
    artistLink.href = artist.url; // Use the Last.fm URL for the artist
    artistLink.target = '_blank'; // Open the link in a new tab/window
    artistLink.textContent = artist.name;

    const artistImage = document.createElement('img');
    artistImage.src = artist.image[2]['#text']; // Use a medium-sized image

    artistCard.appendChild(artistImage);
    artistCard.appendChild(artistLink); // Append the anchor element instead of the artist name directly

    return artistCard;
}
