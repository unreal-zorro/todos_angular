import { ChangeDetectorRef, Component, Renderer2 } from "@angular/core";
import { BaseComponent } from "../../components/base/base.component";

@Component({
  selector: "app-edit-note-page",
  templateUrl: "./edit-note-page.component.html",
  styleUrls: ["./edit-note-page.component.scss"]
})
export class EditNotePageComponent extends BaseComponent {
  constructor(
    public changeDetection: ChangeDetectorRef,
    private _renderer: Renderer2
  ) {
    super(_renderer);
  }
}
