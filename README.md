## MoodGO API doc

### `POST /get-songs`

**Headers:**
- `x-api-key`: _(string, required)_

**Request body example**
```json
{
  "mood": "good", // Limited to 1
  "genres": ["pop", "indie", "classical", "chill", "country"], // Up to 5, minimum 1 - has to be a JSON array
  "platforms":  ["amazon", "apple", "spotify"] // Up to 3, minimum 1 - has to be a JSON array
}
```

**Example values**
- "mood": "bad", "sad", "normal", "good", "wonderful", "energetic";
- "genres": ["pop", "rock", "hip-hop", "electronic", "indie", "metal", "punk", "classical", "alternative", "chill", "country", "techno"];
- "platforms": ["amazon", "apple", "spotify"]

**ERRORS**
- **400 Bad request:** Malformed request (wrong body);
- **401 Unauthorised:** Missing or invalid key;
- **500 Internal server error:** API server is down

### `GET /`

Checking API is working and operational.

**Headers:**
- `x-api-key`: _(string, required)_
