import { ChangeDetectorRef, Component, Renderer2 } from "@angular/core";
import { BaseComponent } from "../../components/base/base.component";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/note.DTO";
import { ModalDialogModel } from "../../models/viewModel/modalDialogModel/modalDialog.model";
import { NoteService } from "../../services/noteService/note.service";
import { NoteRepository } from "../../repositories/noteRepository/note.repository";

@Component({
  selector: "app-note-page",
  templateUrl: "./note-page.component.html",
  styleUrls: ["./note-page.component.scss"]
})
export class NotePageComponent extends BaseComponent {
  note: NoteDTO | void = void 0;
  completed = false;
  modalDialog: ModalDialogModel = new ModalDialogModel();
  handleDelete!: () => void;

  private readonly noteService: NoteService = new NoteService(
    new NoteRepository()
  );

  constructor(
    public changeDetection: ChangeDetectorRef,
    private _renderer: Renderer2
  ) {
    super(_renderer);
  }

  override activate() {
    super.activate();
    this.getNote().then();
    this.modalDialog.handleClose = () => {
      this.modalDialog.show = false;
      this.changeDetection.detectChanges();
      return void 0;
    };

    this.handleDelete = () => {
      try {
        if (this.note) {
          this.modalDialog = {
            ...this.modalDialog,
            show: true,
            title: "Подтвердите удаление заметки",
            text: "Вы точно хотите удалить данную заметку?",
            textOkButton: "Удалить",
            textCancelButton: "Нет, не удалять",
            handleSave: () => {
              this.note
                ? this.noteService.deleteNote(this.note?._id).then()
                : undefined;
              this.note = void 0;
              this.changeDetection.detectChanges();
              return void 0;
            },
            okIsLink: true,
            to: "/notes"
          };
          this.changeDetection.detectChanges();
        }
      } catch (e) {
        console.error(e);
      }
    };
  }

  async getNote(): Promise<void> {
    const idEditMatch = window.location.pathname.match(/\/notes\//);

    if (idEditMatch) {
      const _id = window.location.pathname.slice(7);
      this.requestNote(_id).then();
    }
  }

  async requestNote(_id?: string): Promise<void> {
    try {
      if (_id !== null && _id !== undefined) {
        this.note = await this.noteService?.getNoteById(_id);
        this.completed =
          this.note && this.note?.todos
            ? this.note?.todos?.reduce(
                (complete, todo) => complete && todo.checked,
                true
              )
            : false;
      }
      this.changeDetection.detectChanges();
    } catch (e) {
      console.error(e);
    }
  }
}
