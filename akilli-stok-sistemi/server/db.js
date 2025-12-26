require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Linki .env dosyasından alır
  ssl: {
    rejectUnauthorized: false, // Neon.tech (Bulut) bağlantısı için güvenlik izni
  },
});

module.exports = pool;
