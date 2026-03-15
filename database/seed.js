const { sequelize, Track } = require("./setup");

const sampleTracks = [
  {
    songTitle: "Blinding Lights",
    artistName: "The Weeknd",
    albumName: "After Hours",
    genre: "Pop",
    duration: 200,
    releaseYear: 2019,
  },
  {
    songTitle: "Levitating",
    artistName: "Dua Lipa",
    albumName: "Future Nostalgia",
    genre: "Pop",
    duration: 203,
    releaseYear: 2020,
  },
  {
    songTitle: "Shape of You",
    artistName: "Ed Sheeran",
    albumName: "Divide",
    genre: "Pop",
    duration: 233,
    releaseYear: 2017,
  },
];

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    await Track.bulkCreate(sampleTracks);
    console.log("Database seeded.");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();