import { NoteService } from "./note.service";
import { NoteRepository } from "../../repositories/noteRepository/note.repository";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/note.DTO";
import { TodoDTO } from "../../models/DTOEntities/todoDTO/todo.DTO";

const getMockNote: () => NoteDTO = () => {
  const todo1: TodoDTO = new TodoDTO();
  todo1._id = "1";
  todo1.checked = true;
  todo1.text = "Изучить основные теги";

  const todo2: TodoDTO = new TodoDTO();
  todo2._id = "2";
  todo2.checked = false;
  todo2.text = "Изучить атрибуты тегов";

  const note: NoteDTO = new NoteDTO();
  note._id = "1";
  note.title = "Изучить HTML";
  note.todos = [todo1, todo2];

  return note;
};

const getStringifyNotesArray: (note: NoteDTO) => string = note => {
  return `[${JSON.stringify(note)}]`;
};

describe("NoteService", () => {
  let repository: NoteRepository | null;
  let service: NoteService | null;

  const mockNote: NoteDTO = getMockNote();
  const mockNotes: NoteDTO[] = [mockNote];

  beforeEach(() => {
    repository = new NoteRepository();
    service = new NoteService(repository);

    const existingNotes = localStorage.getItem("notes");
    if (existingNotes) {
      localStorage.setItem("notes_temp", existingNotes);
    }
    localStorage.removeItem("notes");
    localStorage.setItem("notes", JSON.stringify(mockNotes));
  });

  afterEach(() => {
    repository = null;
    service = null;

    localStorage.removeItem("notes");
    const existingNotes = localStorage.getItem("notes_temp");
    if (existingNotes) {
      localStorage.setItem("notes", existingNotes);
    }
  });

  it("should return notes after call method 'getNotes'", async () => {
    const newNotes: NoteDTO[] = [getMockNote()];
    const notes = await service?.getNotes();
    expect(notes).toEqual(newNotes);
  });

  it("should return note after call method 'getNoteById'", async () => {
    const note = await service?.getNoteById("1");
    if (note) {
      expect(note._id).toBe("1");
    }
  });

  it("should return empty note after call method 'getNewNote'", async () => {
    const newNote = new NoteDTO();
    const note = await service?.getNewNote();
    if (note) {
      note._id = "";
      expect(note).toEqual(newNote);
    }
  });

  it("should delete existent note after call method 'deleteNote'", async () => {
    const success = await service?.deleteNote("1");
    if (success) {
      expect(localStorage.getItem("notes")).toBe("[]");
    }
  });

  it("should add new note in localStorage after call method 'addNote'", async () => {
    const newNote: NoteDTO = getMockNote();
    const stringifyNewNotesArray = getStringifyNotesArray(newNote);
    localStorage.removeItem("notes");
    await service?.addNote(newNote);
    expect(localStorage.getItem("notes")).toBe(stringifyNewNotesArray);
  });

  it("should change existent note after call method 'editNote'", async () => {
    const newNote: NoteDTO = getMockNote();
    newNote.title = "Изучить CSS";
    const stringifyNewNotesArray = getStringifyNotesArray(newNote);
    const success = await service?.editNote(newNote);
    if (success) {
      expect(localStorage.getItem("notes")).toBe(stringifyNewNotesArray);
    }
  });
});
