// index.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Middleware de vérification de clé API
app.use((req, res, next) => {
    if (req.path === '/') {
        return next(); // Autoriser la route de base sans clé API
    }

    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.API_KEY; // Ajoutez API_KEY dans .env

    if (!apiKey || apiKey !== validApiKey) {
        return res.status(401).json({ error: 'Clé API invalide ou manquante.' });
    }

    next();
});

// Route de base pour vérifier le fonctionnement
app.get('/', (req, res) => {
    res.send('Chatbot MVP est en cours d\'exécution.');
});

// Route pour gérer les requêtes du chatbot
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: 'Message manquant dans la requête.' });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: userMessage }],
            max_tokens: 1500,
            temperature: 0.7,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });

        const botReply = response.data.choices[0].message.content.trim();
        res.json({ reply: botReply });
    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API OpenAI:', error.message);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

app.listen(port, () => {
    console.log(`Backend démarré sur le port ${port}`);
});
