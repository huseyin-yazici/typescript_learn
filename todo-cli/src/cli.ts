// =============================================================
// cli.ts — Komut satırı arayüzü. Programın giriş noktası.
//
// Kullanım:
//   npm start -- add "Süt al" yüksek
//   npm start -- list
//   npm start -- list bekliyor
//   npm start -- done 1
//   npm start -- remove 1
// =============================================================
import * as path from "path";
import { TodoStore, isPriority } from "./store";
import { Priority, Result, Status, Todo } from "./types";
import { err, ok } from "./result";

// Desteklenen komutlar da bir literal union tipidir.
type Command = "add" | "list" | "done" | "remove" | "help";

function isCommand(value: string): value is Command {
  return ["add", "list", "done", "remove", "help"].includes(value);
}

// Kullanıcının yazdığı metni sayıya çevirir. Başarısız olabileceği için Result<number> döner.
function parseId(raw: string | undefined): Result<number> {
  // raw undefined olabilir (kullanıcı id yazmamış olabilir) — önce bunu kontrol ediyoruz.
  if (raw === undefined) {
    return err("Bir todo numarası (id) yazmalısınız.");
  }
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    return err(`"${raw}" geçerli bir numara değil.`);
  }
  return ok(id);
}

// Öncelik metnini çözümler. Yazılmamışsa varsayılan "orta" kullanılır.
function parsePriority(raw: string | undefined): Result<Priority> {
  // "??" (nullish coalescing): soldaki null/undefined ise sağdakini kullanır.
  const value = raw ?? "orta";
  if (!isPriority(value)) {
    return err(`"${value}" geçerli bir öncelik değil. Seçenekler: düşük, orta, yüksek`);
  }
  return ok(value);
}

// Durum filtresini çözümler. Yazılmamışsa undefined (yani filtre yok) döner.
function parseStatus(raw: string | undefined): Result<Status | undefined> {
  if (raw === undefined) {
    return ok(undefined);
  }
  // Object.values(Status) → ["bekliyor", "tamamlandı"]
  const match = Object.values(Status).find((s) => s === raw);
  if (match === undefined) {
    return err(`"${raw}" geçerli bir durum değil. Seçenekler: bekliyor, tamamlandı`);
  }
  return ok(match);
}

// Öncelik → simge eşlemesi. Record<K, V> tüm anahtarların dolu olmasını zorunlu kılar:
// Priority'ye yeni bir değer eklersek burası derleme hatası verir.
const PRIORITY_ICON: Record<Priority, string> = {
  düşük: "🟢",
  orta: "🟡",
  yüksek: "🔴",
};

// Tek bir todo'yu ekrana yazdırılacak metne çevirir.
function formatTodo(todo: Todo): string {
  const check = todo.status === Status.Done ? "[x]" : "[ ]";
  return `${check} #${todo.id} ${PRIORITY_ICON[todo.priority]} ${todo.title} (${todo.priority})`;
}

function printHelp(): void {
  console.log(`Tipli Yapılacaklar CLI

Komutlar:
  add <başlık> [düşük|orta|yüksek]   Yeni todo ekler (varsayılan öncelik: orta)
  list [bekliyor|tamamlandı]         Todo'ları listeler
  done <id>                          Todo'yu tamamlandı yapar
  remove <id>                        Todo'yu siler
  help                               Bu yardımı gösterir`);
}

// Komutu çalıştırır ve ekrana yazılacak mesajı Result<string> olarak döndürür.
function run(store: TodoStore, command: Command, args: string[]): Result<string> {
  // switch ile her komutu ele alıyoruz. "Command" bir union olduğu için
  // bir durumu unutursak aşağıdaki "never" kontrolü derleme hatası verir.
  switch (command) {
    case "add": {
      const [title, priorityRaw] = args; // noUncheckedIndexedAccess: ikisi de string | undefined
      if (title === undefined) {
        return err('Başlık gerekli. Örnek: add "Süt al" yüksek');
      }
      const priority = parsePriority(priorityRaw);
      if (!priority.ok) return priority; // hata ise aynen yukarı ilet
      const added = store.add({ title, priority: priority.value });
      if (!added.ok) return added;
      return ok(`Eklendi: ${formatTodo(added.value)}`);
    }

    case "list": {
      const status = parseStatus(args[0]);
      if (!status.ok) return status;
      const todos = store.list(status.value);
      if (todos.length === 0) {
        return ok("Liste boş. 🎉");
      }
      return ok(todos.map(formatTodo).join("\n"));
    }

    case "done": {
      const id = parseId(args[0]);
      if (!id.ok) return id;
      const done = store.complete(id.value);
      if (!done.ok) return done;
      return ok(`Tamamlandı: ${formatTodo(done.value)}`);
    }

    case "remove": {
      const id = parseId(args[0]);
      if (!id.ok) return id;
      const removed = store.remove(id.value);
      if (!removed.ok) return removed;
      return ok(`Silindi: #${removed.value.id} ${removed.value.title}`);
    }

    case "help": {
      printHelp();
      return ok("");
    }

    default: {
      // Tüm durumlar ele alındıysa command burada "never" tipindedir.
      // Command'a yeni bir değer ekleyip burayı güncellemezsek TypeScript uyarır.
      const unreachable: never = command;
      return err(`Bilinmeyen komut: ${String(unreachable)}`);
    }
  }
}

// Değiştiren komutlar dosyaya kaydedilmeli; okuyan komutlar değil.
const MUTATING: readonly Command[] = ["add", "done", "remove"];

function main(): void {
  // process.argv: [node yolu, betik yolu, ...kullanıcı argümanları]
  const [commandRaw, ...args] = process.argv.slice(2);

  if (commandRaw === undefined || !isCommand(commandRaw)) {
    if (commandRaw !== undefined) {
      console.error(`Bilinmeyen komut: ${commandRaw}\n`);
    }
    printHelp();
    process.exitCode = commandRaw === undefined ? 0 : 1;
    return;
  }

  // Veri dosyasının yeri: TODO_FILE ortam değişkeni ya da çalışılan klasördeki todos.json
  const filePath = process.env.TODO_FILE ?? path.join(process.cwd(), "todos.json");
  const store = new TodoStore(filePath);

  const loaded = store.load();
  if (!loaded.ok) {
    console.error(`Hata: ${loaded.error}`);
    process.exitCode = 1;
    return;
  }

  const result = run(store, commandRaw, args);
  if (!result.ok) {
    console.error(`Hata: ${result.error}`);
    process.exitCode = 1;
    return;
  }

  if (MUTATING.includes(commandRaw)) {
    const saved = store.save();
    if (!saved.ok) {
      console.error(`Hata: ${saved.error}`);
      process.exitCode = 1;
      return;
    }
  }

  if (result.value !== "") {
    console.log(result.value);
  }
}

main();
