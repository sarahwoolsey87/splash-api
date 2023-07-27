const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8090;

app.get("/", (req, res) => {
  res.send("Hello, this is the home route!");
});

app.get("/photos", async (req, res) => {
  const { searchQuery } = req.query;
  const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
  const API = `https://api.unsplash.com/search/photos/?client_id=${unsplashAccessKey}&query=${encodeURIComponent(
    searchQuery
  )}`;

  try {
    const response = await axios.get(API);
    const photos = response.data.results.map((photo) => ({
      id: photo.id,
      img_url: photo.urls.small,
      alt_description: photo.alt_description,
    }));

    res.json(photos);
  } catch (error) {
    console.error("Error fetching photos from Unsplash API:", error.message);
    res.status(500).json({ error: "Unable to fetch photos from Unsplash API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
