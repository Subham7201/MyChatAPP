// services/openaiService.js
const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OpenAI_KEY, // Replace with your OpenAI API key
});

// ... (any additional OpenAI-related logic)

module.exports = { openai };
