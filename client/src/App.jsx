import { useState, useEffect } from "react";

function App() {
  const [urunAdi, setUrunAdi] = useState("");
  const [stok, setStok] = useState(0);
  const [fiyat, setFiyat] = useState(0);
  const [urunler, setUrunler] = useState([]); // Ürünleri tutacak liste

  // Sayfa açıldığında ürünleri getir
  useEffect(() => {
    verileriGetir();
  }, []);

  // Sunucudan listeyi çeken fonksiyon
  const verileriGetir = async () => {
    try {
      const response = await fetch("http://localhost:5000/urunler");
      const data = await response.json();
      setUrunler(data);
    } catch (err) {
      console.error("Veri çekme hatası:", err.message);
    }
  };

  // Yeni Ürün Ekleme (POST)
  const urunEkle = async (e) => {
    e.preventDefault();
    try {
      const body = { urun_adi: urunAdi, stok_adedi: stok, fiyat: fiyat };
      const response = await fetch("http://localhost:5000/urunler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert("✅ Ürün Başarıyla Eklendi!");
        setUrunAdi("");
        setStok(0);
        setFiyat(0);
        verileriGetir(); // Listeyi güncelle
      }
    } catch (err) {
      console.error("Ekleme hatası:", err.message);
    }
  };

  // Ürün Silme (DELETE) - YENİ EKLENDİ
  const urunSil = async (id) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      try {
        const response = await fetch(`http://localhost:5000/urunler/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Ekranda filtreleme yaparak state'i güncelle (Performans için)
          setUrunler(urunler.filter((urun) => urun.urun_id !== id));
        }
      } catch (err) {
        console.error("Silme hatası:", err.message);
      }
    }
  };

  return (
    <div style={{ padding: "50px", fontFamily: "Arial" }}>
      <h1>📦 Stok Takip Sistemi</h1>

      {/* --- FORM KISMI --- */}
      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h3>Yeni Ürün Ekle</h3>
        <form
          onSubmit={urunEkle}
          style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}
        >
          <div>
            <label>Ürün Adı:</label>
            <br />
            <input
              type="text"
              value={urunAdi}
              onChange={(e) => setUrunAdi(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Stok:</label>
            <br />
            <input
              type="number"
              value={stok}
              onChange={(e) => setStok(e.target.value)}
              style={{ width: "80px" }}
            />
          </div>

          <div>
            <label>Fiyat (TL):</label>
            <br />
            <input
              type="number"
              value={fiyat}
              onChange={(e) => setFiyat(e.target.value)}
              style={{ width: "100px" }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: "green",
              color: "white",
              padding: "8px 15px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            KAYDET
          </button>
        </form>
      </div>

      {/* --- TABLO KISMI --- */}
      <h3>Mevcut Stok Listesi</h3>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th>ID</th>
            <th>Ürün Adı</th>
            <th>Stok Adedi</th>
            <th>Fiyat</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {urunler.map((urun) => (
            <tr key={urun.urun_id}>
              <td>{urun.urun_id}</td>
              <td>{urun.urun_adi}</td>
              <td>{urun.stok_adedi} adet</td>
              <td>{urun.fiyat} TL</td>
              <td>
                <button
                  onClick={() => urunSil(urun.urun_id)}
                  style={{
                    background: "#d9534f",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  SİL
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
