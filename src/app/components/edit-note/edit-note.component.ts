import {
  ChangeDetectorRef,
  Component,
  Inject,
  // InjectionToken,
  Renderer2
} from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { ModalDialogModel } from "../../models/viewModel/modalDialogModel/modalDialog.model";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/note.DTO";
import { NoteService } from "../../services/noteService/note.service";
import { UndoRedoService } from "../../services/undoRedoService/undoRedo.service";
import { TodoDTO } from "../../models/DTOEntities/todoDTO/todo.DTO";
import { NoteRepository } from "../../repositories/noteRepository/note.repository";

// export const LOCATION_TOKEN = new InjectionToken<Location>(
//   "Window location object"
// );

@Component({
  selector: "app-edit-note",
  templateUrl: "./edit-note.component.html",
  styleUrls: ["./edit-note.component.scss"]
  // providers: [{ provide: LOCATION_TOKEN, useValue: window.location }]
})
export class EditNoteComponent extends BaseComponent {
  getPathname(): string {
    return window.location.pathname;
  }

  note: NoteDTO | void = void 0;
  modalDialog: ModalDialogModel = new ModalDialogModel();
  NewMatch = this.getPathname().match(/\/new/);
  EditMatch = this.getPathname().match(/\/edit\//);
  undoSteps = 0;
  redoSteps = 0;
  maxOperations = 5;
  completed: 0 | boolean | undefined = false;

  changeCompleted = (note: NoteDTO | void): 0 | boolean | undefined => {
    return (
      note?.todos?.length &&
      note?.todos?.reduce(
        (checked: boolean, todo) => checked && todo.checked,
        true
      )
    );
  };

  private readonly noteService: NoteService = new NoteService(
    new NoteRepository()
  );

  private readonly undoRedoService: UndoRedoService<NoteDTO | void>;

  constructor(
    public changeDetection: ChangeDetectorRef,
    private _renderer: Renderer2 // @Inject(LOCATION_TOKEN) private location: Location
  ) {
    super(_renderer);
    this.undoRedoService = new UndoRedoService<NoteDTO | void>(
      this.maxOperations
    );
  }

  // useIt(pathname: string) {
  //   this.location.assign(pathname);
  // }

  override activate() {
    super.activate();
    this.getNote().then();
    this.modalDialog.handleClose = () => {
      this.modalDialog.show = false;
      this.changeDetection.detectChanges();
      return void 0;
    };
  }

  async getNote(): Promise<void> {
    let _id = "";
    if (this.EditMatch) {
      _id = this.getPathname().slice(6);
    }
    this.requestNote(_id).then();
  }

  async saveNote(): Promise<void> {
    if (this.note) {
      if (this.NewMatch) {
        this.noteService.addNote(this.note).then();
      } else if (this.EditMatch) {
        this.noteService.editNote(this.note).then();
      }
    }
  }

  async requestNote(_id?: string): Promise<void> {
    try {
      if (_id === "") {
        this.note = await this.noteService?.getNewNote();
      } else if (_id !== null && _id !== undefined) {
        this.note = await this.noteService?.getNoteById(_id);
      }

      this.completed = this.changeCompleted(this.note);

      if (!this.undoRedoService.length()) {
        this.undoRedoService.add(this.note);
        this.undoSteps = 0;
        this.redoSteps = 0;
      }

      this.changeDetection.detectChanges();
    } catch (e) {
      console.error(e);
    }
  }

  handleAddToDo = () => {
    const newToDo = new TodoDTO();
    newToDo._id = Date.now().toString();
    this.note?.todos.push(newToDo);
    this.completed = this.changeCompleted(this.note);

    const { undoSteps, redoSteps } = { ...this.undoRedoService.add(this.note) };
    this.undoSteps = undoSteps;
    this.redoSteps = redoSteps;

    this.changeDetection.detectChanges();
  };

  handleDeleteToDo = (_id: string) => {
    const toDoIndex = this.note?.todos.findIndex(todo => _id === todo._id) ?? 0;
    this.note?.todos.splice(toDoIndex, 1);
    this.completed = this.changeCompleted(this.note);

    const { undoSteps, redoSteps } = { ...this.undoRedoService.add(this.note) };
    this.undoSteps = undoSteps;
    this.redoSteps = redoSteps;

    this.changeDetection.detectChanges();
  };

  handleCheckedToDo = (_id: string) => {
    const newToDos = this.note?.todos.map(todo => {
      if (_id === todo._id) {
        todo.checked = !todo.checked;
      }
      return todo;
    });

    if (newToDos) {
      this.note?.todos.splice(0, newToDos.length, ...newToDos);
      this.completed = this.changeCompleted(this.note);

      const { undoSteps, redoSteps } = {
        ...this.undoRedoService.add(this.note)
      };
      this.undoSteps = undoSteps;
      this.redoSteps = redoSteps;
    }

    this.changeDetection.detectChanges();
  };

  handleChangeToDoText = (_id: string, event: Event) => {
    this.changeDetection.detach();
    const textField = event.target as HTMLElement;

    const newToDos = this.note?.todos.map(todo => {
      if (_id === todo._id) {
        todo.text = textField?.innerText;
      }
      return todo;
    });

    if (newToDos) {
      const note = this.note;
      note?.todos.splice(0, newToDos.length, ...newToDos);

      const { undoSteps, redoSteps } = {
        ...this.undoRedoService.add(note)
      };
      this.undoSteps = undoSteps;
      this.redoSteps = redoSteps;
    }
  };

  handleBlurToDoText = (_id: string, event: Event) => {
    const textField = event.target as HTMLElement;

    const newToDos = this.note?.todos.map(todo => {
      if (_id === todo._id) {
        todo.text = textField?.innerText;
      }
      return todo;
    });

    if (newToDos) {
      this.note?.todos.splice(0, newToDos.length, ...newToDos);
    }

    this.changeDetection.reattach();
  };

  handleChangeTitle = (event: Event) => {
    this.changeDetection.detach();
    const textField = event.target as HTMLElement;

    if (this.note) {
      const note = this.note;
      note.title = textField.innerText;

      const { undoSteps, redoSteps } = {
        ...this.undoRedoService.add(note)
      };
      this.undoSteps = undoSteps;
      this.redoSteps = redoSteps;
    }
  };

  handleBlurTitle = (event: Event) => {
    const textField = event.target as HTMLElement;

    if (this.note && this.note.title !== textField.innerText) {
      this.note.title = textField.innerText;
    }
    this.changeDetection.reattach();
  };

  handleSave = () => {
    try {
      this.modalDialog = {
        ...this.modalDialog,
        show: true,
        title: "Подтвердите сохранение изменений",
        text: "Вы точно хотите сохранить изменения в данной заметке?",
        textOkButton: "Сохранить",
        textCancelButton: "Нет, не сохранять",
        handleSave: () => {
          this.saveNote().then();
          this.modalDialog.handleClose();
          this.changeDetection.detectChanges();
          return void 0;
        },
        okIsLink: true,
        to: "/notes"
      };
      this.changeDetection.detectChanges();
    } catch (e) {
      console.error(e);
    }
  };

  handleCancel = () => {
    try {
      this.modalDialog = {
        ...this.modalDialog,
        show: true,
        title: "Подтвердите отмену изменений",
        text: "Вы точно хотите отменить изменения в данной заметке?",
        textOkButton: "Отменить",
        textCancelButton: "Нет, не отменять",
        handleSave: () => {
          this.getNote().then();
          this.modalDialog.handleClose();
          this.changeDetection.detectChanges();
          return void 0;
        },
        okIsLink: false,
        to: ""
      };
      this.changeDetection.detectChanges();
    } catch (e) {
      console.error(e);
    }
  };

  handleUndo = async () => {
    const { undoSteps, redoSteps, state } = { ...this.undoRedoService.undo() };
    this.undoSteps = undoSteps;
    this.redoSteps = redoSteps;
    this.note = state;
    this.completed = this.changeCompleted(this.note);

    this.changeDetection.detectChanges();
  };

  handleRedo = async () => {
    const { undoSteps, redoSteps, state } = { ...this.undoRedoService.redo() };
    this.undoSteps = undoSteps;
    this.redoSteps = redoSteps;
    this.note = state;
    this.completed = this.changeCompleted(this.note);

    this.changeDetection.detectChanges();
  };
}
