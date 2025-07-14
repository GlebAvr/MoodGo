// services/api.js
import { api } from './apiClient';

// Now accepts platforms as a parameter!
export const getSongsForMood = async (mood, platforms) => {
  const formattedMood = mood.toLowerCase();

  // Post both mood and platforms!
  const res = await api.post('/get-songs', {
    mood: formattedMood,
    platforms  // Array of ['apple'], ['spotify'], ['apple','spotify'] etc.
  });

  const data = res.data;

  const spotify = (data.spotify || []).map(p => ({
    name: p.name,
    url: p.url,
    image: p.image,
    source: 'Spotify',
  }));

  const amazon = (data.amazon || []).map(url => ({
    name: 'Search on Amazon Music',
    url,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Amazon_Music_logo.svg',
    source: 'Amazon',
  }));

  const apple = (data.apple || []).map(url => ({
    name: 'Search on Apple Music',
    url,
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Apple_Music_logo.svg',
    source: 'Apple',
  }));

  return [...spotify, ...amazon, ...apple];
};
