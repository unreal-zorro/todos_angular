import { ChangeDetectorRef, Component, Renderer2 } from "@angular/core";
import { BaseComponent } from "../../components/base/base.component";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/note.DTO";
import { autowired } from "first-di";
import { NoteService } from "../../services/noteService/note.service";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent extends BaseComponent {
  notes: NoteDTO[] | void = [];
  numberOfNotes = 0;

  @autowired()
  private readonly noteService!: NoteService;

  constructor(
    public changeDetection: ChangeDetectorRef,
    private _renderer: Renderer2
  ) {
    super(_renderer);
  }

  override activate() {
    super.activate();
    // this.add().then();
    this.requestNumberOfNotes().then();
  }

  async add() {
    await localStorage.setItem(
      "notes",
      `[
         {
           "_id":"1",
           "title":"Изучить HTML",
           "todos":[
             {
               "_id":"1",
               "checked":true,
               "text":"Изучить основные теги"
             },
             {
               "_id":"2",
               "checked":false,
               "text":"Изучить атрибуты тегов"
             }
           ]
         },
         {
           "_id":"2",
           "title":"Изучить CSS",
           "todos":[
             {
               "_id":"3",
               "checked":true,
               "text":"Изучить селекторы"
             },
             {
               "_id":"4",
               "checked":true,
               "text":"Изучить блочную модель"
             },
             {
               "_id":"5",
               "checked":true,
               "text":"Изучить основные стили"
             }
           ]
         }
       ]`
    );
  }

  async requestNumberOfNotes(): Promise<void> {
    try {
      this.notes = await this.noteService?.getNotes();
      if (this.notes) {
        this.numberOfNotes = this.notes.length;
      }
      this.changeDetection.detectChanges();
    } catch (e) {
      console.error(e);
    }
  }
}
