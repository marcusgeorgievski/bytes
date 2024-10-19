import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "app_user",
  host: "localhost",
  database: "auth",
  password: "app_password",
  port: 5432,
});

// Error handling for the pool
pool.on("error", (err) => {
  console.error("Unexpected error on pg idle client", err);
  process.exit(-1);
});

// Gracefully shutdown the pool when the process ends
process.on("SIGTERM", async () => {
  try {
    await pool.end();
    console.log("Pool has ended");
    process.exit(0);
  } catch (err) {
    console.error("Error shutting down the pool", err.stack);
    process.exit(1);
  }
});

export default pool;
