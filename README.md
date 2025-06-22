# GIF Maker AI

Yapay zeka destekli GIF oluşturma uygulaması. Google Gemini API kullanarak prompt'tan animasyonlu GIF'ler oluşturur.

<p align="center">
  <img src="https://github.com/user-attachments/assets/e7620ddf-ef23-4606-965e-f9fd27da4c1b" width="750" alt="Görsel 1" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/bf5cf9db-fa64-417d-8a4e-ec89ae43d5af" width="750" alt="Görsel 2" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/2cd5cb79-63fc-4131-95bd-34be5eb05726" width="750" alt="Görsel 3" />
</p>

## Özellikler

- 🎨 **AI ile GIF Oluşturma**: Gemini API ile prompt'tan animasyonlu doodle GIF'ler
- 🖼️ **Frame Görüntüleme**: Oluşturulan her frame'i gerçek zamanlı görebilme
- 📱 **Responsive Tasarım**: Mobil ve masaüstü cihazlarda optimize çalışma
- 💾 **GIF İndirme**: Oluşturulan GIF'leri direkt indirebilme
- 🔐 **Güvenli API**: API anahtarı güvenli şekilde saklanma

## Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn
- Gemini API anahtarı

### Adımlar

1. **Bağımlılıkları yükleyin:**
```powershell
npm install
```

2. **Gemini API Anahtarı:**
   - [Google AI Studio](https://makersuite.google.com/app/apikey) adresinden API anahtarı alın
   - Uygulama içinde API anahtarı alanına girin

3. **Geliştirme sunucusunu başlatın:**
```powershell
npm run dev
```

4. **Tarayıcıda açın:**
   - http://localhost:5173 adresine gidin

## Kullanım

1. **API Anahtarı**: Gemini API anahtarınızı girin
2. **Prompt**: İstediğiniz animasyonu açıklayın (örn: "dans eden kedi")
3. **Oluştur**: "GIF Oluştur" butonuna tıklayın
4. **İndir**: Oluşturulan GIF'i indirin

### Örnek Prompt'lar

- "Dans eden sarı kedi"
- "Gülümseyen güneş"
- "Uçan renkli kelebekler"
- "Dalga dalga hareket eden çiçek"
- "Zıplayan mavi top"

## Teknolojiler

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **AI**: Google Gemini API 2.0
- **GIF Encoding**: gifenc
- **Styling**: CSS3 (Flexbox, Grid, Animations)
- **İkonlar**: Font Awesome 6

## Proje Yapısı

```
gifmakerai/
├── src/
│   ├── components/
│   │   ├── GifMaker.tsx          # Ana GIF oluşturucu bileşen
│   │   ├── FrameDisplay.tsx      # Frame görüntüleme
│   │   ├── OutputDisplay.tsx     # Sonuç görüntüleme
│   │   └── *.css                 # Stil dosyaları
│   ├── App.tsx                   # Ana uygulama
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global stiller
├── package.json                  # Bağımlılıklar
├── vite.config.ts               # Vite konfigürasyonu
└── README.md                    # Bu dosya
```

## Komutlar

```powershell
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Build'i önizleme
npm run preview

# Tip kontrolü
npm run type-check

# Linting
npm run lint
```

## API Özellikleri

- **Model**: gemini-2.0-flash-preview-image-generation
- **Frame Sayısı**: 5-10 arası frame
- **Çözünürlük**: 1024x1024 px
- **Format**: PNG → GIF
- **Stil**: Doodle/çizgi film tarzı
- **Arka Plan**: Beyaz

## Güvenlik

- API anahtarları local storage'da saklanmaz
- Tüm API çağrıları HTTPS üzerinden
- Hassas veriler client-side'da işlenir

## Lisans

Bu proje [Apache 2.0 Lisansı](LICENSE) altında lisanslanmıştır.

## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

**Not**: Bu uygulama Google Gemini API kullanır. API kullanım koşullarını ve fiyatlandırmayı kontrol etmeyi unutmayın. 
