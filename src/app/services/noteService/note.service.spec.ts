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

describe("NoteService", () => {
  let repository: NoteRepository | null;
  let service: NoteService | null;

  const mockNote1: NoteDTO = getMockNote();
  const mockNote2: NoteDTO = getMockNote();
  mockNote2._id = "2";
  const mockNotes: NoteDTO[] = [mockNote1, mockNote2];

  beforeEach(() => {
    repository = new NoteRepository();
    service = new NoteService(repository);
  });

  afterEach(() => {
    repository = null;
    service = null;
  });

  it("should add new note after call addNote", async () => {
    const spy = await spyOn<NoteRepository | null>(
      repository,
      "addNewNote" as never
    );
    service?.addNote(mockNote1);
    expect(spy).toHaveBeenCalledWith(mockNote1 as never);
  });

  it("should return notes after call getNotes", async () => {
    const spy = await spyOn<NoteRepository | null>(
      repository,
      "requestNotes" as never
    ).and.returnValue(mockNotes as never);
    const notes: NoteDTO[] | void = await service?.getNotes();
    expect(spy).toHaveBeenCalled();
    expect(notes).toEqual(mockNotes);
  });

  it("should return new note after call getNewNote", async () => {
    const newNote: NoteDTO = new NoteDTO();
    const spy = await spyOn<NoteRepository | null>(
      repository,
      "requestNewNote" as never
    ).and.returnValue(newNote as never);
    const note: NoteDTO | void = await service?.getNewNote();
    expect(spy).toHaveBeenCalled();
    expect(note).toEqual(newNote);
  });

  it("should return note with unique id after call getNoteById", async () => {
    const spy = await spyOn<NoteRepository | null>(
      repository,
      "requestNotes" as never
    ).and.returnValue(mockNotes as never);
    const note: NoteDTO | void = await service?.getNoteById("1");
    expect(spy).toHaveBeenCalled();
    if (note) {
      expect(mockNotes).toContain(note);
    }
  });

  it("should edit note after call editNote", async () => {
    const spy = await spyOn<NoteRepository | null>(
      repository,
      "editExistentNote" as never
    );
    service?.editNote(mockNote1);
    expect(spy).toHaveBeenCalledWith(mockNote1 as never);
  });

  it("should delete note with unique id after call deleteNote", async () => {
    const spy = await spyOn<NoteRepository | null>(
      repository,
      "deleteExistentNote" as never
    ).and.returnValue(true as never);
    let status = false;
    if (service) {
      status = await service.deleteNote("1");
    }
    expect(spy).toHaveBeenCalled();
    expect(status).toBeTrue();
  });
});
