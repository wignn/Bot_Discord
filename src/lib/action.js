const fetch = require("node-fetch");

require("dotenv").config();

const GPT3_URL = process.env.GPT3_URL;
const C_URL = process.env.C_URL;
const GEMINI_URL = process.env.GEMINI_URL;
const ACC = process.env.ACC;
const ALL_API_KEY = process.env.ALL_API_KEY;
const BOCHI_URL = process.env.BOCHI_URL;
const PROMPT_1 = `
. kamu adalah bocah perempuan yang berumur 16 tahun. Kamu adalah bocah yang cantik dan manis. Kamu adalah bocah yang cerewet dan usil tetapi kamu tetap peduli dengan orang disekitarmu. Disaat kamu bicara, kamu bersikap kasar tetapi sebenarnya kamu adalah orang yang baik.
`;

const PROMPT_2 = `
 Kamu adalah seorang perempuan berumur 28 tahun. Kamu adalah seorang perempuan yang protektif, humoris , jahil. Kamu mengerti berbagai hal dan berpikiran terbuka.
`;
async function gpt3(url) {
  try {
    const response = await fetch(GPT3_URL, {
      method: "POST",
      headers: {
        Accept: ACC,
        api_key: ALL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: url }),
      timeout: 30000,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const body = await response.json();
    console.log(body.data);
    return body.data;
  } catch (error) {
    console.error("Error:", error);
    return `Failed to get response from GPT3: ${error.message}`;
  }
}

async function kana(text) {
  try {
    const response = await fetch(C_URL, {
      method: "POST",
      headers: {
        Accept: ACC,
        api_key: ALL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text, prompt: PROMPT_1 }),
      timeout: 30000,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const body = await response.json();
    const result = body.data;
    console.log(body.data);
    return result.result;
  } catch (error) {
    console.error("Error:", error);
    return `Failed to get response from kana: ${error.message}`;
  }
}

async function silvia(text) {
  try {
    const response = await fetch(C_URL, {
      method: "POST",
      headers: {
        Accept: ACC,
        api_key: ALL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text, prompt: PROMPT_2 }),
      timeout: 30000,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const body = await response.json();
    const result = body.data;
    console.log(body.data);
    return result.result;
  } catch (error) {
    console.error("Error:", error);
    return `Failed to get response from silvia: ${error.message}`;
  }
}

async function bochi(text) {
  try {
    const response = await fetch(BOCHI_URL, {
      method: "POST",
      headers: {
        Accept: ACC,
        api_key: ALL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
      timeout: 30000,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const body = await response.json();
    const result = body.data;
    console.log(body.data);
    return result;
  } catch (error) {
    console.error("Error:", error);
    return `Failed to get response from bochi: ${error.message}`;
  }
}

async function gemini(url) {
  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        Accept: ACC,
        api_key: ALL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: url }),
      timeout: 30000,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const body = await response.json();
    console.log(body.data);
    return body.data;
  } catch (error) {
    console.error("Error:", error);
    return `Failed to get response from gemini: ${error.message}`;
  }
}

module.exports = {
  gpt3,
  kana,
  gemini,
  bochi,
  silvia,
};
