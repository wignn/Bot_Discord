const fetch = require('node-fetch');

require('dotenv').config();

const GPT3_URL = process.env.GPT3_URL;
const KANA_URL = process.env.KANA_URL;
const GEMINI_URL = process.env.GEMINI_URL;
const ACC = process.env.ACC;
const ALL_API_KEY = process.env.ALL_API_KEY;

async function gpt3(url) {
    try {
        const response = await fetch(GPT3_URL, {
            method: 'POST',
            headers: {
                'Accept': ACC,
                'api_key': ALL_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: url }),
            timeout: 30000
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const body = await response.json();
        console.log(body.data);
        return body.data;
    } catch (error) {
        console.error('Error:', error);
        return `Failed to get response from GPT3: ${error.message}`;
    }
}

async function kana(text) {
    try {
        const response = await fetch(KANA_URL, {
            method: 'POST',
            headers: {
                'Accept': ACC,
                'api_key': ALL_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text, prompt: process.env.PROMPT_1}),
            timeout: 30000
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const body = await response.json();
        const result = body.data;
        console.log(body.data);
        return result.result;
    } catch (error) {
        console.error('Error:', error);
        return `Failed to get response from GPT3: ${error.message}`;
    }
}

async function gemini(url) {
    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: {
                'Accept': ACC,
                'api_key': ALL_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: url }),
            timeout: 30000
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const body = await response.json();
        console.log(body.data);
        return body.data;
    } catch (error) {
        console.error('Error:', error);
        return `Failed to get response from GPT3: ${error.message}`;
    }
}

module.exports = {
    gpt3,
    kana,
    gemini
};