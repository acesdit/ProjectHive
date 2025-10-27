// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Assuming you installed node-fetch@2
require('dotenv').config(); // This loads the .env file

const app = express();
const port = 3000;
const NEWS_API_KEY = process.env.NEWS_API_KEY; // Safely gets the key

// Use CORS to allow your frontend to communicate with this server
app.use(cors()); 

// --- CRITICAL DEBUGGING CHECK ---
if (!NEWS_API_KEY) {
    console.error("❌ CRITICAL ERROR: NEWS_API_KEY is missing or not loading from .env file!");
    process.exit(1); 
}
// ---------------------------------


// Define the proxy endpoint that your frontend will call: http://localhost:3000/api/news
app.get('/api/news', async (req, res) => {
    // Get query parameters from the frontend (e.g., 'q', 'page')
    const { q = 'India', page = 1, pageSize = 5 } = req.query; 

    // Construct the URL to the *actual* NewsAPI endpoint using the secret key
    const newsApiUrl = `https://newsapi.org/v2/everything?q=${q}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`;
    
    try {
        // Fetch the data from NewsAPI using the secret key
        const apiResponse = await fetch(newsApiUrl);
        const data = await apiResponse.json();

        // Send the NewsAPI response back to the frontend
        res.json(data);
    } catch (error) {
        console.error("NewsAPI or Fetch Error:", error);
        res.status(500).json({ error: "Failed to fetch news." });
    }
});

// Start the server and listen on the defined port
app.listen(port, () => {
    // This message confirms the server is running and listening
    console.log(`✅ Proxy server running on http://localhost:${port}`);
});