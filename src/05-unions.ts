// 05 - Union tipler ve tip daraltma (narrowing)
// Çalıştır: npx tsx src/05-unions.ts

// Union (birleşim) tip: "şu VEYA bu" demek. "|" ile yazılır.
let kimlik: string | number;
kimlik = "AB-12";
kimlik = 12;

// Union bir değeri kullanırken önce hangi tip olduğunu kontrol etmelisin.
// Buna tip daraltma (narrowing) denir.
function kimlikYazdir(k: string | number): string {
  if (typeof k === "string") {
    return k.toUpperCase(); // burada k: string
  }
  return k.toFixed(0); // burada k: number
}

// Literal union: sınırlı seçenek listesi (enum'a hafif bir alternatif).
type Durum = "beklemede" | "onaylandi" | "reddedildi";

function durumMesaji(d: Durum): string {
  switch (d) {
    case "beklemede":
      return "Siparişin inceleniyor.";
    case "onaylandi":
      return "Siparişin yola çıktı!";
    case "reddedildi":
      return "Sipariş iptal edildi.";
  }
}

// Ayırt edici (discriminated) union: her üyede ortak bir "tur" alanı olur.
type Sekil =
  | { tur: "daire"; yaricap: number }
  | { tur: "kare"; kenar: number }
  | { tur: "dikdortgen"; en: number; boy: number };

function alan(s: Sekil): number {
  switch (s.tur) {
    case "daire":
      return Math.PI * s.yaricap ** 2;
    case "kare":
      return s.kenar ** 2;
    case "dikdortgen":
      return s.en * s.boy;
    default: {
      // Tüm durumlar ele alındıysa s burada "never" olur.
      // Sekil'e yeni bir tür eklersen bu satır derleme hatası verir.
      const kontrol: never = s;
      return kontrol;
    }
  }
}

// null ile union: değer olmayabilir
function ilkHarf(metin: string | null): string {
  return metin === null ? "-" : metin.charAt(0);
}

// "in" operatörü ile daraltma
type Kedi = { miyavla: () => string };
type Kopek = { havla: () => string };
function sesCikar(hayvan: Kedi | Kopek): string {
  return "miyavla" in hayvan ? hayvan.miyavla() : hayvan.havla();
}

console.log(kimlikYazdir("ab-12"), kimlikYazdir(12.7));
console.log(durumMesaji("onaylandi"));
console.log("Alanlar:", alan({ tur: "daire", yaricap: 1 }).toFixed(2), alan({ tur: "kare", kenar: 3 }));
console.log(ilkHarf("Türkiye"), ilkHarf(null));
console.log(sesCikar({ havla: () => "Hav!" }));

// ---------------------------------------------------------------------------
// ALIŞTIRMALAR
// 1) string | string[] alan ve her durumda tek bir string döndüren
//    "birlestir" fonksiyonu yaz (dizi ise ", " ile birleştir).
//    İpucu: Array.isArray ile daralt.
// 2) "Sekil" tipine { tur: "ucgen"; taban: number; yukseklik: number } ekle.
//    alan() fonksiyonunda hangi satır hata verdi? Neden? Düzelt.
// 3) "Durum" tipine "kargoda" ekle ve durumMesaji'nin nasıl tepki verdiğini gör.
// ---------------------------------------------------------------------------

// Bu dosyayı modül yapar; böylece diğer dosyalardaki aynı isimli değişkenlerle çakışmaz.
export {};
