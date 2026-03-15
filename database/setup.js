const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE || "./database/music_library.db",
  logging: false
});

const Track = sequelize.define(
  "Track",
  {
    trackId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    songTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artistName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    albumName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: "tracks"
  }
);

async function setupDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
    await sequelize.sync({ force: true });
    console.log("Tables created.");
  } catch (error) {
    console.error("Setup error:", error);
  } finally {
    await sequelize.close();
  }
}

if (require.main === module) {
  setupDatabase();
}

module.exports = { sequelize, Track };