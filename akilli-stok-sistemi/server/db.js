require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD, // <-- Şifreyi artık .env dosyasından okuyacak
  host: "localhost",
  port: 5432,
  database: "stok_takip_db",
});

module.exports = pool;
