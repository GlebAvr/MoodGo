// services/apiClient.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://moodgo.onrender.com", // closing quote!
  timeout: 8000,
  headers: { "Content-Type": "application/json",
        "x-api-key": "Sup8rS8cr8etK4Y?!><Gl4nM4ximus123"
   },
});
