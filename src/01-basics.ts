// 01 - Temel tipler
// Çalıştırmak için: npm run dev src/01-basics.ts

// İlkel tipler
const ad: string = "Ada";
const yas: number = 28;
const ogrenciMi: boolean = true;

// Diziler
const puanlar: number[] = [85, 92, 78];

// Nesne tipi (interface)
interface Kullanici {
  ad: string;
  yas: number;
  eposta?: string; // isteğe bağlı alan
}

const kullanici: Kullanici = { ad, yas };

// Parametre ve dönüş tipi belirtilmiş fonksiyon
function ortalama(sayilar: number[]): number {
  if (sayilar.length === 0) return 0;
  const toplam = sayilar.reduce((a, b) => a + b, 0);
  return toplam / sayilar.length;
}

// Birleşim (union) tipi
type Durum = "aktif" | "pasif";

function durumMesaji(durum: Durum): string {
  return durum === "aktif" ? "Hesap aktif" : "Hesap pasif";
}

console.log(`Merhaba ${kullanici.ad}, yaşın ${kullanici.yas}.`);
console.log(`Öğrenci mi? ${ogrenciMi ? "Evet" : "Hayır"}`);
console.log(`Puan ortalaması: ${ortalama(puanlar).toFixed(2)}`);
console.log(durumMesaji("aktif"));

// Aşağıdaki satırın yorumunu kaldırırsan TypeScript hata verir:
// const hatali: number = "on"; // Type 'string' is not assignable to type 'number'.
