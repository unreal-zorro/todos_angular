import { NoteRepository } from "./note.repository";
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

describe("NoteRepository", () => {
  let repository: NoteRepository | null;

  beforeEach(() => {
    repository = new NoteRepository();

    const existingNotes = localStorage.getItem("notes");
    if (existingNotes) {
      localStorage.setItem("notes_temp", existingNotes);
    }
    localStorage.removeItem("notes");
  });

  afterEach(() => {
    repository = null;

    localStorage.removeItem("notes");
    const existingNotes = localStorage.getItem("notes_temp");
    if (existingNotes) {
      localStorage.setItem("notes", existingNotes);
    }
  });

  it("should add new note in localStorage after call method 'addNewNote'", async () => {
    const newNote: NoteDTO = getMockNote();
    const stringifyNewNotesArray = getStringifyNotesArray(newNote);
    await repository?.addNewNote(newNote);
    expect(localStorage.getItem("notes")).toBe(stringifyNewNotesArray);
  });

  it("should return notes after call method 'requestNotes'", async () => {
    const newNote: NoteDTO = getMockNote();
    const stringifyNewNotesArray = getStringifyNotesArray(newNote);
    const newNotes = JSON.parse(stringifyNewNotesArray);
    const notes = await repository?.requestNotes();
    if (notes) {
      expect(notes).toEqual(newNotes);
    }
  });

  it("should return new empty note after call method 'requestNewNote'", async () => {
    const newNote = new NoteDTO();
    const note = await repository?.requestNewNote();
    if (note) {
      note._id = "";
      expect(note).toEqual(newNote);
    }
  });

  it("should change existent note after call method 'editExistentNote'", async () => {
    const newNote: NoteDTO = getMockNote();
    newNote.title = "Изучить CSS";
    const stringifyNewNotesArray = getStringifyNotesArray(newNote);
    const success = await repository?.editExistentNote(newNote);
    if (success) {
      expect(localStorage.getItem("notes")).toBe(stringifyNewNotesArray);
    }
  });

  it("should delete existent note after call method 'deleteExistentNote'", async () => {
    const success = await repository?.deleteExistentNote("1");
    if (success) {
      expect(localStorage.getItem("notes")).toBe("[]");
    }
  });
});
