const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// --- ARAÇLAR (Middleware) ---
app.use(cors());
app.use(express.json()); // JSON formatındaki verileri okuyabilmek için gerekli

// --- ROTALAR ---

// 1. Test Rotası
app.get("/", (req, res) => {
  res.send("Akıllı Stok Takip Sistemi Sunucusu Çalışıyor!");
});

// 2. Veritabanı Bağlantı Testi
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Veritabanı hatası!");
  }
});

// 3. Yeni Ürün Ekleme (POST)
app.post("/urunler", async (req, res) => {
  try {
    const { urun_adi, stok_adedi, fiyat } = req.body;

    const yeniUrun = await pool.query(
      "INSERT INTO urunler (urun_adi, stok_adedi, fiyat) VALUES($1, $2, $3) RETURNING *",
      [urun_adi, stok_adedi, fiyat]
    );

    res.json(yeniUrun.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu Hatası");
  }
});

// 4. Tüm Ürünleri Listele (GET)
app.get("/urunler", async (req, res) => {
  try {
    const tumUrunler = await pool.query(
      "SELECT * FROM urunler ORDER BY urun_id ASC"
    );
    res.json(tumUrunler.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ürünler getirilirken bir hata oluştu.");
  }
});

// 5. Ürün Sil (DELETE) - YENİ EKLENEN KISIM
app.delete("/urunler/:id", async (req, res) => {
  try {
    const { id } = req.params; // URL'deki id parametresini al (Örn: /urunler/5)
    await pool.query("DELETE FROM urunler WHERE urun_id = $1", [id]);
    res.json("Ürün başarıyla silindi!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Silme işlemi sırasında sunucu hatası oluştu.");
  }
});

// --- SUNUCU BAŞLATMA ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
