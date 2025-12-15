const axios = require("axios");

const powerBiClient = axios.create({
  baseURL: process.env.POWERBI_BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    Origin: "https://app.powerbi.com",
    Referer: "https://app.powerbi.com/",
    "x-powerbi-resourcekey": "63c3ed14-129a-45a7-89b2-3c1d2a3141d3",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0",
  },
});

module.exports = powerBiClient;
