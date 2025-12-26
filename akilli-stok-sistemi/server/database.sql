CREATE DATABASE stok_takip_db;

CREATE TABLE urunler(
    urun_id SERIAL PRIMARY KEY,
    urun_adi VARCHAR(255) NOT NULL,
    stok_adedi INT DEFAULT 0,
    fiyat DECIMAL(10, 2) NOT NULL,
    eklenme_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
