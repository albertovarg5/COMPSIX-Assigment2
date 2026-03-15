const express = require("express");
const { Track } = require("./database/setup");
require("dotenv").config();

const app = express();
app.use(express.json());

// GET all tracks
app.get("/api/tracks", async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET one track
app.get("/api/tracks/:id", async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);

    if (!track) {
      return res.status(404).json({ error: "Track not found" });
    }

    res.json(track);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST
app.post("/api/tracks", async (req, res) => {
  try {
    const { songTitle, artistName, albumName, genre, duration, releaseYear } = req.body;

    if (!songTitle || !artistName || !albumName || !genre) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTrack = await Track.create({
      songTitle,
      artistName,
      albumName,
      genre,
      duration,
      releaseYear,
    });

    res.status(201).json(newTrack);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT
app.put("/api/tracks/:id", async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);

    if (!track) {
      return res.status(404).json({ error: "Track not found" });
    }

    await track.update(req.body);
    res.json(track);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE
app.delete("/api/tracks/:id", async (req, res) => {
  try {
    const deletedRows = await Track.destroy({
      where: { trackId: req.params.id }
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Track not found" });
    }

    res.json({ message: "Track deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});