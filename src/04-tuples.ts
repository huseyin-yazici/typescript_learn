// 04 - Tuple'lar (demetler)
// Çalıştır: npx tsx src/04-tuples.ts

// Tuple: uzunluğu ve her konumdaki tipi sabit olan dizi.
const koordinat: [number, number] = [41.01, 28.97];
const kisi: [string, number] = ["Mehmet", 30];
// const yanlis: [string, number] = [30, "Mehmet"]; // HATA: sıra önemli

// Destructuring ile parçalara ayırma
const [enlem, boylam] = koordinat;
const [ad, yas] = kisi;

// Etiketli (labeled) tuple: okunabilirliği artırır, davranış aynıdır.
type Aralik = [baslangic: number, bitis: number];
const mesai: Aralik = [9, 18];

// Opsiyonel eleman: "?" ile belirtilir.
type Renk = [kirmizi: number, yesil: number, mavi: number, alfa?: number];
const turuncu: Renk = [255, 165, 0];
const yariSaydam: Renk = [0, 0, 255, 0.5];

// readonly tuple: değiştirilemez
const sabitNokta: readonly [number, number] = [0, 0];
// sabitNokta[0] = 5; // HATA

// Fonksiyondan birden fazla değer döndürmek için sık kullanılır.
function minMax(liste: number[]): [min: number, max: number] {
  return [Math.min(...liste), Math.max(...liste)];
}
const [enKucuk, enBuyuk] = minMax([7, 2, 9, 4]);

console.log({ enlem, boylam, ad, yas, mesai, turuncu, yariSaydam, sabitNokta });
console.log("min/max:", enKucuk, enBuyuk);

// ---------------------------------------------------------------------------
// ALIŞTIRMALAR
// 1) [string, number, boolean] tipinde "urun" adında bir tuple tanımla
//    (ad, fiyat, stokta mı) ve destructuring ile değişkenlere ayır.
// 2) Bir string alıp [ilkHarf: string, uzunluk: number] döndüren
//    "ozet" fonksiyonu yaz.
// 3) "sabitNokta" satırındaki atamanın yorumunu kaldır ve hatayı oku.
//    readonly kaldırılınca ne değişiyor?
// ---------------------------------------------------------------------------

// Bu dosyayı modül yapar; böylece diğer dosyalardaki aynı isimli değişkenlerle çakışmaz.
export {};
