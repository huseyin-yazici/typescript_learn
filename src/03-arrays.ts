// 03 - Diziler (arrays)
// Çalıştır: npx tsx src/03-arrays.ts

// Dizi tipi iki şekilde yazılır: tip[] veya Array<tip>. İkisi aynı şeydir.
const sayilar: number[] = [1, 2, 3, 4];
const meyveler: Array<string> = ["elma", "armut"];

meyveler.push("kiraz");
// meyveler.push(42); // HATA: number, string dizisine eklenemez

// Dizi metotları tipleri korur: map'in sonucu number[] olur.
const kareler = sayilar.map((n) => n * n);
const ciftler = sayilar.filter((n) => n % 2 === 0);
const toplam = sayilar.reduce((acc, n) => acc + n, 0);

// Karışık tipler için union kullanılır (detayı 05 numaralı dosyada).
const karisik: (string | number)[] = ["bir", 2, "üç"];

// readonly dizi: içeriği değiştirilemez.
const gunler: readonly string[] = ["Pzt", "Sal", "Çar"];
// gunler.push("Per"); // HATA: readonly dizide push yok

// Nesne dizileri
const ogrenciler: { ad: string; not: number }[] = [
  { ad: "Ali", not: 85 },
  { ad: "Zeynep", not: 92 },
];
const enYuksek = ogrenciler.reduce((a, b) => (a.not > b.not ? a : b));

// Dikkat: dizinin olmayan bir indeksine erişmek undefined döner,
// ama TypeScript bunu varsayılan olarak number gibi gösterir.
// tsconfig'de "noUncheckedIndexedAccess" açıksa tip number | undefined olur.
const ilk = sayilar[0];

console.log({ sayilar, meyveler, kareler, ciftler, toplam, karisik, gunler });
console.log("En yüksek not:", enYuksek.ad, enYuksek.not);
console.log("İlk eleman:", ilk);

// ---------------------------------------------------------------------------
// ALIŞTIRMALAR
// 1) "sicakliklar" adında bir number[] tanımla ve ortalamasını hesapla.
// 2) Bir string[] içindeki kelimelerin uzunluklarından oluşan bir number[]
//    üret (ipucu: map). Sonucun tipini editörde imleçle kontrol et.
// 3) "ogrenciler" dizisinden notu 90'ın üstünde olanların sadece adlarını
//    içeren bir string[] üret.
// ---------------------------------------------------------------------------

// Bu dosyayı modül yapar; böylece diğer dosyalardaki aynı isimli değişkenlerle çakışmaz.
export {};
