// 06 - type ve interface farkı
// Çalıştır: npx tsx src/06-type-vs-interface.ts

// İkisi de nesnelerin şeklini tanımlar ve çoğu durumda birbirinin yerine
// kullanılabilir.

interface KullaniciI {
  id: number;
  ad: string;
  eposta?: string; // opsiyonel alan
  readonly kayitTarihi: Date; // sonradan değiştirilemez
}

type KullaniciT = {
  id: number;
  ad: string;
  eposta?: string;
  readonly kayitTarihi: Date;
};

const u1: KullaniciI = { id: 1, ad: "Can", kayitTarihi: new Date() };
const u2: KullaniciT = u1; // yapıları aynı olduğu için birbirine atanabilir
// u1.kayitTarihi = new Date(); // HATA: readonly

// --- Genişletme ---
// interface "extends" kullanır:
interface Yonetici extends KullaniciI {
  yetkiler: string[];
}
// type ise "&" (intersection / kesişim) kullanır:
type Editor = KullaniciT & { bolum: string };

const yonetici: Yonetici = { id: 2, ad: "Elif", kayitTarihi: new Date(), yetkiler: ["sil"] };
const editor: Editor = { id: 3, ad: "Kerem", kayitTarihi: new Date(), bolum: "Spor" };

// --- Sadece type ile yapılabilenler ---
// Union, tuple ve ilkel tiplere takma ad vermek:
type Kimlik = string | number;
type Nokta = [number, number];
type Eposta = string;

// --- Sadece interface ile yapılabilenler ---
// Declaration merging: aynı isimli interface'ler otomatik birleşir.
interface Ayarlar {
  tema: "acik" | "koyu";
}
interface Ayarlar {
  dil: string;
}
const ayarlar: Ayarlar = { tema: "koyu", dil: "tr" }; // iki alan da zorunlu

// --- Sınıflar ikisini de implement edebilir ---
interface Konusabilir {
  konus(): string;
}
class Robot implements Konusabilir {
  konus() {
    return "Bip bop!";
  }
}

// Pratik kural: nesne şekilleri ve sınıf sözleşmeleri için interface,
// union/tuple/yardımcı tipler için type kullan. En önemlisi projede tutarlı ol.

const kimlik: Kimlik = "x-1";
const nokta: Nokta = [3, 4];
const eposta: Eposta = "can@example.com";

console.log(u2.ad, yonetici.yetkiler, editor.bolum);
console.log(kimlik, nokta, eposta, ayarlar, new Robot().konus());

// ---------------------------------------------------------------------------
// ALIŞTIRMALAR
// 1) "Urun" adında bir interface yaz: ad (string), fiyat (number),
//    indirim (opsiyonel number). Aynısını type ile de yaz.
// 2) Urun'u genişleten "DijitalUrun" tanımla (indirmeLinki: string).
//    Bir kez extends, bir kez & ile dene.
// 3) "Ayarlar" interface'ine üçüncü bir tanımla "bildirimler: boolean" ekle.
//    "ayarlar" sabitinde ne hata çıkıyor? Aynı şeyi type ile yapmayı dene.
// ---------------------------------------------------------------------------

// Bu dosyayı modül yapar; böylece diğer dosyalardaki aynı isimli değişkenlerle çakışmaz.
export {};
