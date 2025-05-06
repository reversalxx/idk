const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// This should be POST, not GET
app.post('/bypass', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Missing URL in request body' });
    }

    const apiUrl = `https://bypass.vip/premium/bypass?url=${encodeURIComponent(url)}`;
    const apiKey = process.env.apikey;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey
            }
        });

        const data = await response.json();

        // Send data back to frontend
        res.json(data);
    } catch (err) {
        console.error('Bypass error:', err);
        res.status(500).json({ error: 'Something went wrong while bypassing.' });
    }
});

app.listen(port, () => {
    console.log(`Running the server on port ${PORT}`);
});
