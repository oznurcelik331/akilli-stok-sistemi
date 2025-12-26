// Sunucuya gönderilecek test ürünü
const yeniUrun = {
  urun_adi: "Oyuncu Klavyesi",
  stok_adedi: 50,
  fiyat: 1250.0,
};

// Sunucuya "Bunu kaydet" (POST) emri gönderiyoruz
fetch("http://localhost:5000/urunler", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(yeniUrun),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("------------------------------------------");
    console.log("✅ BAŞARILI! Ürün veritabanına eklendi:");
    console.log(data);
    console.log("------------------------------------------");
  })
  .catch((error) => console.error("❌ HATA:", error));
