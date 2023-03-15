import { UndoRedoService } from "./undoRedo.service";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/note.DTO";
import { TodoDTO } from "../../models/DTOEntities/todoDTO/todo.DTO";

const getMockNotesState: () => NoteDTO[] = () => {
  const todo1: TodoDTO = new TodoDTO();
  todo1._id = "1";
  todo1.checked = true;
  todo1.text = "Изучить основные теги";

  const todo2: TodoDTO = new TodoDTO();
  todo2._id = "2";
  todo2.checked = false;
  todo2.text = "Изучить атрибуты тегов";

  const note1: NoteDTO = new NoteDTO();
  note1._id = "1";
  note1.title = "Изучить HTML";
  note1.todos = [todo1, todo2];

  const todo3: TodoDTO = new TodoDTO();
  todo1._id = "3";
  todo1.checked = true;
  todo1.text = "Изучить селекторы";

  const todo4: TodoDTO = new TodoDTO();
  todo2._id = "4";
  todo2.checked = true;
  todo2.text = "Изучить блочную модель";

  const todo5: TodoDTO = new TodoDTO();
  todo2._id = "5";
  todo2.checked = true;
  todo2.text = "Изучить основные стили";

  const note2: NoteDTO = new NoteDTO();
  note2._id = "2";
  note2.title = "Изучить CSS";
  note2.todos = [todo3, todo4, todo5];

  return [note1, note2];
};

describe("UndoRedoService", () => {
  let service: UndoRedoService<NoteDTO> | null;
  let serviceLength: number | null;

  beforeEach(() => {
    serviceLength = 5;
    service = new UndoRedoService<NoteDTO>(serviceLength);
  });

  afterEach(() => {
    serviceLength = null;
    service = null;
  });

  it("should add state in localStorage after call add", () => {
    const newNote = getMockNotesState()[0];
    const stringifyNewNotesArray = JSON.stringify([newNote]);
    service?.add(newNote);
    expect(localStorage.getItem("notesStore")).toBe(stringifyNewNotesArray);
  });

  it("should return undoSteps after call add", () => {
    const newNote1 = getMockNotesState()[0];
    const newNote2 = getMockNotesState()[1];
    service?.add(newNote1);
    service?.add(newNote2);
    service?.add(newNote1);
    if (service) {
      const { undoSteps } = service.add(newNote2);
      expect(undoSteps).toBe(3);
    }
  });

  it("should return length of state after call length", () => {
    const newNote1 = getMockNotesState()[0];
    const newNote2 = getMockNotesState()[1];
    service?.add(newNote1);
    service?.add(newNote2);
    service?.add(newNote1);
    service?.add(newNote2);
    service?.add(newNote1);
    service?.add(newNote2);
    service?.add(newNote1);
    service?.add(newNote2);
    const length = service?.length();
    if (serviceLength) {
      expect(length).toBe(serviceLength + 1);
    }
  });

  it("should return maxlength after call length after add greater them maxLength", () => {
    const newNote1 = getMockNotesState()[0];
    const newNote2 = getMockNotesState()[1];
    service?.add(newNote1);
    service?.add(newNote2);
    const length = service?.length();
    expect(length).toBe(2);
  });

  it("should return redoSteps after call undo", () => {
    const newNote1 = getMockNotesState()[0];
    const newNote2 = getMockNotesState()[1];
    service?.add(newNote1);
    service?.add(newNote2);
    if (service) {
      const { redoSteps } = { ...service.undo() };
      expect(redoSteps).toBe(1);
    }
  });

  it("should return undoSteps after call redo", () => {
    const newNote1 = getMockNotesState()[0];
    const newNote2 = getMockNotesState()[1];
    service?.add(newNote1);
    service?.add(newNote2);
    if (service) {
      const { undoSteps } = { ...service.redo() };
      expect(undoSteps).toBe(1);
    }
  });
});
