
const http = require("node:http");
const { Pool } = require("pg");

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432
});

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/health") {
    res.end(JSON.stringify(getHealth()));
    return;
  }

  if (req.url === "/db-check") {
    try {
      const result = await db.query(
        "SELECT NOW() AS server_time"
      );

      res.end(JSON.stringify({
        status: "database connected",
        time: result.rows[0].server_time
      }));
    } catch (error) {
      console.error(error);
      res.writeHead(500);
      res.end(JSON.stringify({
        error: "database unavailable"
      }));
    }
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(3000, "0.0.0.0", () => {
  console.log("API listening on port 3000");
});
