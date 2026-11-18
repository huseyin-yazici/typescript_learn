// 07 - Fonksiyon parametre ve dönüş tipleri
// Çalıştır: npx tsx src/07-functions.ts

// Parametrelerin tipi her zaman yazılmalı; dönüş tipi çıkarılabilir ama
// açıkça yazmak niyetini belgeler ve hataları erken yakalar.
function topla(a: number, b: number): number {
  return a + b;
}

// Ok fonksiyonu (arrow function)
const carp = (a: number, b: number): number => a * b;

// Opsiyonel parametre: "?" ile, zorunlulardan sonra gelmeli.
function selamla(ad: string, unvan?: string): string {
  return unvan ? `Merhaba ${unvan} ${ad}` : `Merhaba ${ad}`;
}

// Varsayılan değerli parametre: tipi değerden çıkarılır.
function fiyatHesapla(tutar: number, kdvOrani = 0.2): number {
  return tutar * (1 + kdvOrani);
}

// Rest parametre: sınırsız sayıda argüman, dizi olarak gelir.
function ortalama(...sayilar: number[]): number {
  if (sayilar.length === 0) return 0;
  return sayilar.reduce((t, n) => t + n, 0) / sayilar.length;
}

// Nesne parametresi + destructuring
function kartOlustur({ ad, yas }: { ad: string; yas: number }): string {
  return `${ad} (${yas})`;
}

// void: anlamlı bir değer döndürmeyen fonksiyonlar
function logla(mesaj: string): void {
  console.log(`[LOG] ${mesaj}`);
}

// never: asla normal şekilde bitmeyen fonksiyonlar (hep hata fırlatır)
function hataVer(mesaj: string): never {
  throw new Error(mesaj);
}

// Fonksiyon tipi: bir fonksiyonun "imzasını" tip olarak tanımlamak
type IkiliIslem = (x: number, y: number) => number;
const cikar: IkiliIslem = (x, y) => x - y; // x ve y'nin tipi imzadan gelir

// Fonksiyonu parametre olarak almak (callback)
function uygula(dizi: number[], islem: (n: number) => number): number[] {
  return dizi.map(islem);
}

// Overload: aynı fonksiyonun farklı imzaları
function ikiKat(deger: number): number;
function ikiKat(deger: string): string;
function ikiKat(deger: number | string): number | string {
  return typeof deger === "number" ? deger * 2 : deger.repeat(2);
}

console.log(topla(2, 3), carp(4, 5), cikar(10, 4));
console.log(selamla("Deniz"), "|", selamla("Deniz", "Dr."));
console.log(fiyatHesapla(100), fiyatHesapla(100, 0.5));
console.log(ortalama(3, 5, 10), kartOlustur({ ad: "Ece", yas: 22 }));
console.log(uygula([1, 2, 3], (n) => n * 10), ikiKat(21), ikiKat("ha"));
logla("Fonksiyonlar tamam.");
try {
  hataVer("Bu bilerek fırlatılan bir hata");
} catch (e) {
  console.log("Yakalandı:", (e as Error).message);
}

// ---------------------------------------------------------------------------
// ALIŞTIRMALAR
// 1) Bir string ve opsiyonel bir "ayrac" (varsayılan "-") alan, kelimeleri
//    bu ayraçla birleştirip döndüren "slugYap" fonksiyonu yaz.
//    Örnek: slugYap("Merhaba Dünya") => "merhaba-dünya"
// 2) "Filtre" adında (n: number) => boolean tipinde bir fonksiyon tipi tanımla
//    ve number[] ile Filtre alıp filtrelenmiş dizi döndüren fonksiyon yaz.
// 3) topla("2", 3) çağrısının yorumunu kaldırıp hatayı oku:
//    // topla("2", 3);
// ---------------------------------------------------------------------------

// Bu dosyayı modül yapar; böylece diğer dosyalardaki aynı isimli değişkenlerle çakışmaz.
export {};
