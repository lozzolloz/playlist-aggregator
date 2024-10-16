import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

export const { Pool } = pkg;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5001;

const connectionString = process.env.DB_CONNECTION_STRING;

const pool = new Pool({
  connectionString: connectionString,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to PostgreSQL database!");
    done();
  }
});

app.get("/", (req, res) => {
  res.send("Hello, this is your backend server!");
});

app.get("/playlists", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM playlists ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/playlists/:year", async (req, res) => {
  const { year } = req.params;

  try {
    const result = await pool.query("SELECT * FROM playlists WHERE year = $1", [
      year,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addplaylist", async (req, res) => {
  const { name, year, uri } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO playlists (name, year, uri) VALUES ($1, $2, $3);",
      [name, year, uri]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error posting to database", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add plays to plays[year] table
app.post("/addplay/:playYear", async (req, res) => {
  const { title, artists, uri, sourcePlaylist } = req.body;
  const { playYear } = req.params;

  try {
    await pool.query(
      `INSERT INTO plays${playYear} (title, artists, uri, sourcePlaylist) VALUES ($1, $2, $3, $4)`,
      [title, artists, uri, sourcePlaylist]
    );
    res.json({ message: "play added successfully" });
  } catch (error) {
    console.error("Error adding play:", error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// Remove all plays from the specified year table
app.post("/removeallplays/:year", async (req, res) => {
  const { year } = req.params;
  try {
    await pool.query(`DELETE FROM plays${year}`);
    res.json({ message: "All plays removed successfully" });
  } catch (error) {
    console.error("Error removing plays:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Helper function to capitalize artists
const capitalizeArtists = (artists) => {
  return Array.isArray(artists)
    ? artists.map((artist) => artist.toUpperCase())
    : artists.toUpperCase();
};

// Get all plays from a year, ordered by most played
app.get("/toptracks/:year", async (req, res) => {
  const { year } = req.params;

  try {
    const result = await pool.query(
      `SELECT UPPER(title) as title, artists, MIN(uri) as uri, COUNT(*) as count
      FROM plays${year}
      GROUP BY UPPER(title), artists
      ORDER BY count DESC, title;`
    );

    // Capitalize artists names
    const capitalizedResult = result.rows.map((row) => ({
      ...row,
      artists: capitalizeArtists(row.artists),
    }));

    res.json(capitalizedResult);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// Get all plays across multiple years, ordered by most played
app.get("/toptracksall", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT UPPER(title) as title, artists, MIN(uri) as uri, COUNT(*) as count
      FROM (
          SELECT title, artists, uri
          FROM plays2019
          UNION ALL
          SELECT title, artists, uri
          FROM plays2020
          UNION ALL
          SELECT title, artists, uri
          FROM plays2021
          UNION ALL
          SELECT title, artists, uri
          FROM plays2022
          UNION ALL
          SELECT title, artists, uri
          FROM plays2023
          UNION ALL
          SELECT title, artists, uri
          FROM plays2024
      ) AS combined_plays
      GROUP BY UPPER(title), artists
      ORDER BY count DESC, title;`
    );

    // Capitalize artists names
    const capitalizedResult = result.rows.map((row) => ({
      ...row,
      artists: capitalizeArtists(row.artists),
    }));

    res.json(capitalizedResult);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all playlists in plays
app.get("/allplaylistsinplays", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT sourcePlaylist
      FROM (
        SELECT sourcePlaylist FROM plays2019
        UNION ALL
        SELECT sourcePlaylist FROM plays2020
        UNION ALL
        SELECT sourcePlaylist FROM plays2021
        UNION ALL
        SELECT sourcePlaylist FROM plays2022
        UNION ALL
        SELECT sourcePlaylist FROM plays2023
        UNION ALL
        SELECT sourcePlaylist FROM plays2024
      ) AS combinedTable;`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get top artists of a specific year
app.get("/topartists/:year", async (req, res) => {
  const { year } = req.params;
  try {
    const result = await pool.query(
      `SELECT artist, COUNT(*) as count
      FROM (
          SELECT unnest(artists) as artist 
          FROM plays${year}
      ) AS unnested_artists
      GROUP BY artist
      ORDER BY count DESC, artist;`
    );

    // Capitalize artists names
    const capitalizedResult = result.rows.map((row) => ({
      ...row,
      artist: row.artist.toUpperCase(),
    }));

    res.json(capitalizedResult);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// Get top artists across all years
app.get("/topartistsall", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT artist, COUNT(*) as count
      FROM (
          SELECT unnest(artists) as artist
          FROM plays2019
          UNION ALL
          SELECT unnest(artists) as artist
          FROM plays2020
          UNION ALL
          SELECT unnest(artists) as artist
          FROM plays2021
          UNION ALL
          SELECT unnest(artists) as artist
          FROM plays2022
          UNION ALL
          SELECT unnest(artists) as artist
          FROM plays2023
          UNION ALL
          SELECT unnest(artists) as artist
          FROM plays2024
      ) AS unnested_artists
      GROUP BY artist
      ORDER BY count DESC, artist;`
    );

    // Capitalize artists names
    const capitalizedResult = result.rows.map((row) => ({
      ...row,
      artist: row.artist.toUpperCase(),
    }));

    res.json(capitalizedResult);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// find new tracks
app.get("/newtracks/:year", async (req, res) => {
  const { year } = req.params;
  let lastyear = year - 1;
  try {
    let query = `SELECT UPPER(title) as title, artists, MIN(uri) as uri, COUNT(*) as count
      FROM plays${year}
      WHERE NOT EXISTS (
          SELECT 1
          FROM plays${lastyear}
          WHERE UPPER(plays${lastyear}.title) = UPPER(plays${year}.title)
          AND plays${lastyear}.artists = plays${year}.artists
      )`;
    // Add NOT EXISTS clauses for all previous years down to 2019
    for (let i = lastyear - 1; i >= 2019; i--) {
      query += `
        AND NOT EXISTS (
          SELECT 1
          FROM plays${i}
          WHERE UPPER(plays${i}.title) = UPPER(plays${year}.title)
          AND plays${i}.artists = plays${year}.artists
        )`;
    }
    query += `
      GROUP BY UPPER(title), artists
      ORDER BY count DESC, title;`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// find new artists
app.get("/newartists/:year", async (req, res) => {
  const { year } = req.params;
  let lastyear = year - 1;
  try {
    let query = `SELECT artist, COUNT(*) as count
      FROM (
          SELECT unnest(artists) as artist
          FROM plays${year}
      ) AS unnested_artists
      WHERE NOT EXISTS (
          SELECT 1
          FROM plays${lastyear}, unnest(plays${lastyear}.artists) AS unnested_artists_${lastyear}
          WHERE unnested_artists_${lastyear} = unnested_artists.artist
      )`;
    // Add NOT EXISTS clauses for all previous years down to 2019
    for (let i = lastyear - 1; i >= 2019; i--) {
      query += `
        AND NOT EXISTS (
          SELECT 1
          FROM plays${i}, unnest(plays${i}.artists) AS unnested_artists_${i}
          WHERE unnested_artists_${i} = unnested_artists.artist
        )`;
    }
    query += `
      GROUP BY artist
      ORDER BY count DESC, artist;`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





// Close the database connection when the server is stopped
process.on("SIGINT", () => {
  pool
    .end()
    .then(() => {
      console.log("Database connection closed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error closing database connection:", error);
      process.exit(1);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
