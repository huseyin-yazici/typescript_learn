// 02 - İlkel (primitive) tipler
// Çalıştır: npx tsx src/02-primitive-types.ts

// TypeScript'te en temel tipler: string, number, boolean, null, undefined,
// bigint ve symbol. Değişkene tip yazmak için ":" kullanılır.

const isim: string = "Ayşe";
const yas: number = 28; // tam sayı ve ondalık ayrımı yok, hepsi number
const ogrenciMi: boolean = true;

// Tip çıkarımı (type inference): değeri verirsen TypeScript tipi kendisi bulur.
let sehir = "İzmir"; // sehir: string
// sehir = 35; // HATA: 'number' tipi 'string' tipine atanamaz

// null ve undefined: "değer yok" anlamına gelen iki ayrı tip.
let ikinciAd: string | undefined = undefined;
ikinciAd = "Nur";

// bigint: number'ın güvenli sınırını aşan tam sayılar için (sonuna n eklenir).
const cokBuyuk: bigint = 9007199254740993n;

// symbol: her zaman benzersiz olan değerler.
const id1: symbol = Symbol("id");
const id2: symbol = Symbol("id");

// Literal tipler: sadece belirli bir değeri kabul eden tipler.
const yon: "sol" | "sag" = "sol";

// any ve unknown
// any: tip kontrolünü kapatır, mümkün olduğunca kaçın.
// unknown: "ne olduğunu bilmiyorum" der, kullanmadan önce kontrol etmeni ister.
const gelenVeri: unknown = "merhaba";
if (typeof gelenVeri === "string") {
  console.log("unknown daraltıldı:", gelenVeri.toUpperCase());
}

console.log({ isim, yas, ogrenciMi, sehir, ikinciAd, cokBuyuk, yon });
console.log("Semboller eşit mi?", id1 === id2); // false

// ---------------------------------------------------------------------------
// ALIŞTIRMALAR
// 1) "urunAdi" (string), "fiyat" (number) ve "stoktaVar" (boolean) adında
//    tipleri açıkça yazılmış üç değişken tanımla ve ekrana yazdır.
// 2) Aşağıdaki satırın yorumunu kaldır. Neden hata veriyor? Düzelt.
//    let puan: number = "100";
// 3) "durum" adında, sadece "aktif" | "pasif" değerlerini alabilen bir
//    değişken tanımla. Ona "silindi" atamayı dene ve hatayı gözle.
// ---------------------------------------------------------------------------

// Bu dosyayı modül yapar; böylece diğer dosyalardaki aynı isimli değişkenlerle çakışmaz.
export {};
