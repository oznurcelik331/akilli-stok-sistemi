Akıllı Stok Takip Sistemi

Bu proje, işletmelerin stoklarını anlık olarak takip edebilmesi, ürün ekleyip silmesi ve kritik stok seviyelerini izlemesi için geliştirilmiş tam donanımlı bir **Full-Stack** uygulamadır.

Teknolojiler
**Frontend:** React, CSS Modules
**Backend:** Node.js, Express.js
**Veritabanı:** PostgreSQL
**Deployment:** Vercel (Frontend), Render/Neon (Database)

Özellikler
- Ürün Ekleme/Silme/Listeleme
- İsim ile anlık ürün arama
- Kritik stok seviyesi uyarısı (Stok < 5)
- Toplam envanter değeri hesaplama

Kurulum
1. Depoyu klonlayın: `git clone https://github.com/oznurcelik331/akilli-stok-sistemi.git`
2. Backend bağımlılıklarını kurun: `cd backend && npm install`
3. Frontend bağımlılıklarını kurun: `cd frontend && npm install`
4. `.env` dosyasını oluşturun ve veritabanı bilgilerinizi girin.
5. Uygulamayı başlatın: `npm run dev`
