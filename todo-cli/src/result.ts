// =============================================================
// result.ts — Result<T> oluşturmak için küçük yardımcılar.
// =============================================================
import { Result } from "./types";

// Başarılı sonuç üretir. <T> generic parametresi değerin tipini korur:
// ok(5) → Result<number>, ok("merhaba") → Result<string>
export function ok<T>(value: T): Result<T> {
  return { ok: true, value };
}

// Hatalı sonuç üretir. "never" hiçbir değeri olmayan tiptir;
// bu sayede err(...) her Result<T> yerine kullanılabilir.
export function err(error: string): Result<never> {
  return { ok: false, error };
}
