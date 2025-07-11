require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {OpenAI} = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API call
async function getOpenAIMoodKeywords(mood) {
  try {
    const prompt = `Suggest 3 Spotify playlist keywords for the mood: "${mood}". Respond with a comma-separated list.`;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 30,
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;
    return text.split(',').map(kw => kw.trim()).filter(Boolean);
  } catch (error) {
    console.error("OpenAI API error:", error.message);
    return [];
  }
}

async function getMoodKeywordsWithFallback(mood) {
  // Try real AI call first (commented out for now)
  /*
  try {
    // Uncomment this block and use your actual AI call when you have quota
    // const keywords = await getOpenAIMoodKeywords(mood);
    // if (keywords.length > 0) return keywords;
  } catch (error) {
    console.warn('AI call failed, using fallback data.');
  }
  */

  // Mock/fallback keywords for each mood

  const normalizedMood = mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
  const fallback = {
    Bad: ['party', 'upbeat', 'sunshine'],
    Sad: ['melancholy', 'breakup', 'acoustic'],
    Normal: ['workout', 'power', 'dance'],
    Good: ['relax', 'lofi', 'chillout'],
    Wonderful: ['love', 'slow', 'date'],
    Energetic: ['workout, power']
  };
  if (!fallback[normalizedMood]) console.warn('Unknown mood, using generic fallback:', mood);
  return fallback[normalizedMood] || ['playlist', 'music', 'mood'];
}

const axios = require('axios');

let spotifyToken = null;
let spotifyTokenExpires = 0;

// Get (or refresh) Spotify access token
async function getSpotifyAccessToken() {
  if (spotifyToken && Date.now() < spotifyTokenExpires) return spotifyToken;

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await axios.post('https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }),
    { headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  spotifyToken = res.data.access_token;
  spotifyTokenExpires = Date.now() + (res.data.expires_in - 60) * 1000; // expires_in is in seconds
  return spotifyToken;
}

// Search for playlists using a keyword
async function searchSpotifyPlaylists(keyword) {
  const token = await getSpotifyAccessToken();
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(keyword)}&type=playlist&limit=5`;
  const res = await axios.get(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const items = (
    res.data &&
    res.data.playlists &&
    Array.isArray(res.data.playlists.items)
  ) ? res.data.playlists.items : [];

  //console.log("Spotify API raw response:", JSON.stringify(res.data, null, 2));
  //console.log("Items to map over:", items);
  console.log(`Found ${items.length} playlists for keyword "${keyword}"`);

  return items
    .filter(pl => pl)
    .map(pl => ({
    name: pl.name,
    url: pl.external_urls.spotify,
    id: pl.id,
    image: pl.images[0]?.url
  }));
}

async function searchSpotifyPlaylistsWithFallback(keywords) {
  for (let keyword of keywords) {
    const results = await searchSpotifyPlaylists(keyword);
    if (results.length > 0) return results;
  }
  return []; // No playlists found for any keyword
}

function getAmazonMusicLinks(keywords) {
  return keywords.map(keyword =>
    `https://music.amazon.com/search/${encodeURIComponent(keyword)}`
  );
}

function getAppleMusicLinks(keywords) {
  return keywords.map(keyword =>
    `https://music.apple.com/us/search?term=${encodeURIComponent(keyword)}`
  );
}


app.get('/', (req, res) => {
    res.send('MoodGo BED is working and operational!');
});

app.post('/get-songs', async (req, res) => {
    const {mood} = req.body;
    const keywords = await getMoodKeywordsWithFallback(mood);
    
    let playlists = [];
    try {
        playlists = await searchSpotifyPlaylistsWithFallback(keywords);

    } catch (error) {
        console.error('Spotify API error:', error.message);
    };

    const amazonMusicLinks = getAmazonMusicLinks(keywords);
    const appleMusicLinks = getAppleMusicLinks(keywords);

    res.json({
        message: `Music playlists and links for mood: ${mood} (Spotify, Amazong Music, Apple Music)`,
        mood,
        ai_keywords: keywords,
        spotify: playlists,
        amazon: amazonMusicLinks,
        apple: appleMusicLinks
    });
});

app.listen(PORT, () => {
    console.log(`Server is operational on port: ${PORT}`);
})


