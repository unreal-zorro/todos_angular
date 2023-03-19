import { ChangeDetectorRef, Component, Inject, Renderer2 } from "@angular/core";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/note.DTO";
import { NoteRepository } from "../../repositories/noteRepository/note.repository";
import { NoteService } from "../../services/noteService/note.service";
import { BaseComponent } from "../../components/base/base.component";
import { ModalDialogModel } from "../../models/viewModel/modalDialogModel/modalDialog.model";

@Component({
  selector: "app-note-list-page",
  templateUrl: "./note-list-page.component.html",
  styleUrls: ["./note-list-page.component.scss"]
})
export class NoteListPageComponent extends BaseComponent {
  notes: NoteDTO[] | void = [];
  completed: boolean[] | undefined = [];
  modalDialog: ModalDialogModel = new ModalDialogModel();

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
    this.requestNotes().then();
    this.modalDialog.handleClose = () => {
      this.modalDialog.show = false;
      this.changeDetection.detectChanges();
      return void 0;
    };
  }

  async requestNotes(): Promise<void> {
    try {
      this.notes = await this.noteService?.getNotes();
      this.completed = this.notes?.map(note =>
        note.todos?.reduce(
          (complete: boolean, todo) => complete && todo.checked,
          true
        )
      );
      this.changeDetection.detectChanges();
    } catch (e) {
      console.error(e);
    }
  }

  handleDelete = (_id: string) => () => {
    try {
      if (this.notes) {
        this.modalDialog = {
          ...this.modalDialog,
          show: true,
          title: "Подтвердите удаление заметки",
          text: "Вы точно хотите удалить данную заметку?",
          textOkButton: "Удалить",
          textCancelButton: "Нет, не удалять",
          handleSave: () => {
            const noteIndex = this.notes
              ? this.notes?.findIndex(note => _id === note._id)
              : 0;
            this.notes?.splice(noteIndex, 1);
            this.noteService.deleteNote(_id).then();
            this.modalDialog.show = false;
            this.changeDetection.detectChanges();
            return void 0;
          },
          okIsLink: false,
          to: ""
        };
      }
      this.changeDetection.detectChanges();
    } catch (e) {
      console.error(e);
    }
  };
}
