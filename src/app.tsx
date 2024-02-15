import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface Note {
  id: string;
  date: Date;
  content: string;
}
export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }
    return [];
  });

  function onNoteCreate(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => {
      return note.id !== id;
    });

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));

    toast.success('Nota deletada')
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setSearch(query);
  }

  const filteredNotes = notes.filter((note) => {
    if (search === "") {
      return true;
    } else {
      return note.content.toLowerCase().includes(search.toLowerCase());
    }
  });

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <h1 className="text-6xl font-bold">Notas</h1>
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tighter placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreate={onNoteCreate} />

        {filteredNotes.map((note) => {
          return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}/>;
        })}
      </div>
    </div>
  );
}
