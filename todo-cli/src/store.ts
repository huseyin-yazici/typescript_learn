// =============================================================
// store.ts — Todo'ları bellekte tutar ve JSON dosyasına kaydeder.
// =============================================================
import * as fs from "fs";
import { NewTodo, Priority, PRIORITIES, Result, Status, Todo } from "./types";
import { err, ok } from "./result";

// Kullanıcıdan gelen metnin geçerli bir Priority olup olmadığını kontrol eder.
// "value is Priority" bir "tip koruyucu"dur (type guard):
// fonksiyon true dönerse TypeScript, value'nun Priority olduğunu bilir.
export function isPriority(value: string): value is Priority {
  // PRIORITIES readonly bir dizi olduğu için includes'a string verebilmek adına
  // onu geçici olarak readonly string[] olarak görüyoruz.
  return (PRIORITIES as readonly string[]).includes(value);
}

export class TodoStore {
  // private: sınıf dışından doğrudan erişilemez
  private todos: Todo[] = [];

  constructor(private readonly filePath: string) {}

  // Dosyadan yükler. Dosya yoksa boş listeyle başlar.
  load(): Result<number> {
    if (!fs.existsSync(this.filePath)) {
      this.todos = [];
      return ok(0);
    }
    try {
      const raw = fs.readFileSync(this.filePath, "utf-8");
      // JSON.parse "any" döner. "unknown" olarak alıp kendimiz kontrol etmek daha güvenlidir.
      const data: unknown = JSON.parse(raw);
      if (!Array.isArray(data)) {
        return err(`${this.filePath} geçerli bir todo listesi değil.`);
      }
      // Basitlik için dosyadaki verinin doğru şekilde olduğunu varsayıyoruz.
      this.todos = data as Todo[];
      return ok(this.todos.length);
    } catch (e) {
      // catch içindeki "e" strict modda "unknown" tipindedir.
      const message = e instanceof Error ? e.message : String(e);
      return err(`Dosya okunamadı: ${message}`);
    }
  }

  // Dosyaya kaydeder. Döndürecek anlamlı bir değer olmadığı için Result<void>.
  save(): Result<void> {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.todos, null, 2), "utf-8");
      return ok(undefined);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return err(`Dosya yazılamadı: ${message}`);
    }
  }

  // Yeni todo ekler.
  add(input: NewTodo): Result<Todo> {
    const title = input.title.trim();
    if (title.length === 0) {
      return err("Başlık boş olamaz.");
    }
    const todo: Todo = {
      id: this.nextId(),
      title,
      priority: input.priority,
      status: Status.Pending,
      createdAt: new Date().toISOString(),
    };
    this.todos.push(todo);
    return ok(todo);
  }

  // Tüm todo'ları döndürür. İsteğe bağlı olarak duruma göre filtreler.
  // "readonly Todo[]" çağıranın listeyi değiştirmesini engeller.
  list(filter?: Status): readonly Todo[] {
    // filter "Status | undefined" tipindedir; undefined ise filtreleme yapma.
    if (filter === undefined) {
      return this.todos;
    }
    return this.todos.filter((t) => t.status === filter);
  }

  // id ile todo bulur. Bulamazsa undefined döner — dönüş tipi bunu açıkça söyler.
  findById(id: number): Todo | undefined {
    return this.todos.find((t) => t.id === id);
  }

  // Todo'yu tamamlandı olarak işaretler.
  complete(id: number): Result<Todo> {
    const todo = this.findById(id);
    // strictNullChecks: bu kontrol olmadan "todo.status" yazamayız,
    // çünkü todo undefined olabilir.
    if (todo === undefined) {
      return err(`#${id} numaralı todo bulunamadı.`);
    }
    if (todo.status === Status.Done) {
      return err(`#${id} zaten tamamlanmış.`);
    }
    // Bu satırda TypeScript todo'nun kesinlikle Todo olduğunu bilir (daraltma / narrowing).
    todo.status = Status.Done;
    todo.completedAt = new Date().toISOString();
    return ok(todo);
  }

  // Todo'yu siler ve silinen öğeyi döndürür.
  remove(id: number): Result<Todo> {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      return err(`#${id} numaralı todo bulunamadı.`);
    }
    // splice bir dizi döner; [0] ise noUncheckedIndexedAccess nedeniyle "Todo | undefined" olur.
    const removed = this.todos.splice(index, 1)[0];
    if (removed === undefined) {
      return err("Beklenmeyen hata: öğe silinemedi.");
    }
    return ok(removed);
  }

  // Bir sonraki id: mevcut en büyük id + 1 (liste boşsa 1).
  private nextId(): number {
    return this.todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  }
}
