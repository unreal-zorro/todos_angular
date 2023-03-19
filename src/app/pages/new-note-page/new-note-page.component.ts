import { ChangeDetectorRef, Component, Renderer2 } from "@angular/core";
import { BaseComponent } from "../../components/base/base.component";

@Component({
  selector: "app-new-note-page",
  templateUrl: "./new-note-page.component.html",
  styleUrls: ["./new-note-page.component.scss"]
})
export class NewNotePageComponent extends BaseComponent {
  constructor(
    public changeDetection: ChangeDetectorRef,
    private _renderer: Renderer2
  ) {
    super(_renderer);
  }
}
