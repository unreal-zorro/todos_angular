import { reflection } from "first-di";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/note.DTO";
import { TodoDTO } from "../../models/DTOEntities/todoDTO/todo.DTO";

@reflection
export class MockNoteRepository {
  async requestNotes(): Promise<NoteDTO[]> {
    const note1 = new NoteDTO();

    const todo1 = new TodoDTO();
    todo1._id = "1";
    todo1.checked = true;
    todo1.text =
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, odit!";

    const todo2 = new TodoDTO();
    todo2._id = "2";
    todo2.checked = false;
    todo2.text = "consectetur Lorem ipsum dolor sit amet, adipisicing";

    const todo3 = new TodoDTO();
    todo3._id = "3";
    todo3.checked = true;
    todo3.text =
      "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, odit!";

    note1._id = "1";
    note1.title = "Заголовок 1";
    note1.todos = [todo1, todo2, todo3];

    const note2 = new NoteDTO();

    const todo4 = new TodoDTO();
    todo4._id = "4";
    todo4.checked = true;
    todo4.text = "Lorem elit. Neque, odit!";

    const todo5 = new TodoDTO();
    todo5._id = "5";
    todo5.checked = true;
    todo5.text = "consectetur Lorem ipsum dolor sit amet, adipisicing";

    note2._id = "2";
    note2.title = "Заголовок 2";
    note2.todos = [todo4, todo5];

    const notes = [note1, note2];

    return new Promise(resolve => resolve(notes));
  }
}
