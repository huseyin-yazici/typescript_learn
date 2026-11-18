# typescript_learn

TypeScript öğrenmek için küçük, çalıştırılabilir örnekler.

## Gereksinimler

- Node.js 20 veya üzeri
- npm

## Kurulum

```bash
npm install
```

## Örnekleri çalıştırma

Her örnek `src/` klasöründe ayrı bir dosyadır ve numarayla sıralanır (`01-basics.ts`, `02-...`).
Bir örneği derlemeden doğrudan çalıştırmak için [tsx](https://tsx.is) kullanılır:

```bash
npm run dev src/01-basics.ts
```

Dosyayı her kaydettiğinde otomatik yeniden çalıştırmak için:

```bash
npm run watch src/01-basics.ts
```

## Tip kontrolü ve derleme

`tsx` tipleri kontrol etmez, sadece çalıştırır. Tip hatalarını görmek için:

```bash
npm run typecheck
```

JavaScript çıktısı üretmek için (çıktı `dist/` klasörüne gider):

```bash
npm run build
node dist/01-basics.js
```

## Ayarlar

`tsconfig.json` içinde `strict: true` açıktır. Bu sayede `null`/`undefined` kontrolleri,
örtük `any` yasağı gibi katı kurallar baştan alışkanlık hâline gelir.

## Yeni örnek ekleme

1. `src/` altında bir sonraki numarayla yeni dosya oluştur, örneğin `src/02-functions.ts`.
2. `npm run dev src/02-functions.ts` ile çalıştır.
3. `npm run typecheck` ile tip hatası olmadığını doğrula.
