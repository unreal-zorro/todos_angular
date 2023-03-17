import { ChangeDetectorRef, Component, Input, Renderer2 } from "@angular/core";
import { BaseComponent } from "../base/base.component";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent extends BaseComponent {
  @Input() checked?: boolean;
  @Input() text?: string;
  @Input() onChecked?: () => boolean;

  constructor(
    public changeDetection: ChangeDetectorRef,
    private _renderer: Renderer2
  ) {
    super(_renderer);
  }
}
