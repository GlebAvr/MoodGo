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
  const fallback = {
    bad: ['party', 'upbeat', 'sunshine'],
    sad: ['melancholy', 'breakup', 'acoustic'],
    soso: ['workout', 'power', 'dance'],
    good: ['relax', 'lofi', 'chillout'],
    wonderful: ['love', 'slow', 'date'],
    // Add more moods as you like
  };
  if (!fallback[mood]) console.warn('Unknown mood, using generic fallback:', mood);
  return fallback[mood] || ['playlist', 'music', 'mood'];
}

app.get('/', (req, res) => {
    res.send('MoodGo BED is working and operational!');
});

app.post('/get-songs', async (req, res) => {
    const {mood} = req.body;
    const keywords = await getMoodKeywordsWithFallback(mood);
    console.log(`Received mood: ${mood}`);

    res.json({
        message: `AI keywords for mood: ${mood}`,
        mood: mood,
        ai_keywords: keywords
    });
});

app.listen(PORT, () => {
    console.log(`Server is operational on port: ${PORT}`);
})


