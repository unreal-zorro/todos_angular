import { ChangeDetectorRef, Component, Input, Renderer2 } from "@angular/core";
import { BaseComponent } from "../base/base.component";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent extends BaseComponent {
  @Input() show?: boolean;
  @Input() title?: string;
  @Input() text?: string;
  @Input() textOkButton?: string;
  @Input() textCancelButton?: string;
  @Input() handleClose?: () => void;
  @Input() handleSave?: () => void;
  @Input() okIsLink?: boolean;
  @Input() to?: string;

  constructor(
    public changeDetection: ChangeDetectorRef,
    private _renderer: Renderer2
  ) {
    super(_renderer);
  }

  override activate() {
    super.activate();
  }

  modalClickHandler = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("modal")) {
      this.handleClose ? this.handleClose() : undefined;
    }
    return undefined;
  };
}
