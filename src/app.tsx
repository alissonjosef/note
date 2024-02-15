import { NewNoreCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <h1 className="text-6xl font-bold">Notas</h1>
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tighter placeholder:text-slate-500 outline-none"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoreCard />

        <NoteCard date={new Date()} content={"No app do NLW vamos criar um layout incrível, assim podemos entregar a melhor experiência para a comunidade."} />
    
      </div>
    </div>
  );
}
