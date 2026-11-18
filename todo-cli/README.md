# Tipli Yapılacaklar CLI 📝

TypeScript'in temel tip özelliklerini öğrenmek için küçük bir komut satırı uygulaması.

## Çalıştırma

```bash
cd todo-cli
npm install
npm run build

npm start -- add "Süt al" yüksek
npm start -- add "TypeScript çalış"      # öncelik verilmezse: orta
npm start -- list
npm start -- list bekliyor
npm start -- done 1
npm start -- remove 1
npm start -- help
```

Todo'lar çalışılan klasördeki `todos.json` dosyasına kaydedilir
(`TODO_FILE` ortam değişkeniyle değiştirilebilir).

## Hangi dosyada ne öğrenirim?

| Kavram | Nerede |
| --- | --- |
| `interface` ve `readonly` / isteğe bağlı (`?`) alanlar | `src/types.ts` → `Todo` |
| Literal (birleşim) tipler | `src/types.ts` → `Priority`, `src/cli.ts` → `Command` |
| `enum` | `src/types.ts` → `Status` |
| Generic `Result<T>` (ayrıştırılmış birleşim) | `src/types.ts`, `src/result.ts` |
| Tip koruyucular (`value is Priority`) | `src/store.ts` → `isPriority` |
| Strict null kontrolleri, `??`, daraltma (narrowing) | `src/store.ts` → `complete`, `src/cli.ts` → `parseId` |
| `Pick`, `Record` yardımcı tipleri | `src/types.ts` → `NewTodo`, `src/cli.ts` → `PRIORITY_ICON` |
| `never` ile eksiksiz `switch` kontrolü | `src/cli.ts` → `run` |

## Kendin dene 💡

- `Priority` tipine `"acil"` ekle ve `npm run typecheck` çalıştır. `PRIORITY_ICON` neden hata veriyor?
- `Command` tipine `"edit"` ekle. `run` içindeki `never` satırı ne diyor?
- `store.ts` içindeki `if (todo === undefined)` kontrolünü sil. TypeScript ne söylüyor?
