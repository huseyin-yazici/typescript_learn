// =============================================================
// types.ts — Uygulamadaki tüm tipler burada tanımlanır.
// =============================================================

// ---------- 1) Literal tip (birleşim / union) ----------
// "Priority" sadece bu üç metinden biri olabilir.
// Örn: const p: Priority = "acil"; // ❌ Derleme hatası!
export type Priority = "düşük" | "orta" | "yüksek";

// Geçerli öncelikleri çalışma zamanında da kullanabilmek için bir dizi.
// "as const" sayesinde tipi string[] değil, readonly ["düşük", "orta", "yüksek"] olur.
export const PRIORITIES = ["düşük", "orta", "yüksek"] as const;

// ---------- 2) Enum ----------
// Enum, birbiriyle ilişkili sabitlere isim vermenin bir yoludur.
// String enum kullanıyoruz; böylece JSON dosyasında okunabilir değerler saklanır.
export enum Status {
  Pending = "bekliyor",
  Done = "tamamlandı",
}

// ---------- 3) Interface ----------
// Bir yapılacak (todo) öğesinin "şekli".
export interface Todo {
  // readonly: oluşturulduktan sonra değiştirilemez
  readonly id: number;
  title: string;
  priority: Priority;
  status: Status;
  readonly createdAt: string; // ISO tarih metni, örn: "2026-11-18T22:45:00.000Z"
  // Soru işareti (?) = isteğe bağlı alan. Henüz tamamlanmadıysa yoktur.
  // strictNullChecks açık olduğu için bunu kullanmadan önce kontrol etmek zorundayız.
  completedAt?: string;
}

// Yeni todo eklerken sadece bu alanları isteriz.
// Pick<T, K> yardımcı tipi: Todo'dan yalnızca "title" ve "priority" alanlarını seçer.
export type NewTodo = Pick<Todo, "title" | "priority">;

// ---------- 4) Generic Result<T> tipi ----------
// Hata fırlatmak (throw) yerine, fonksiyonlar ya başarı ya da hata DÖNDÜRÜR.
// Bu bir "ayrıştırılmış birleşim"dir (discriminated union):
// "ok" alanına bakarak hangi durumda olduğumuzu TypeScript anlar.
export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };
