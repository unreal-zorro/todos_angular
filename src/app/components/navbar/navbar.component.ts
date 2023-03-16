import { ChangeDetectorRef, Component, Renderer2 } from "@angular/core";
import { BaseComponent } from "../base/base.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent extends BaseComponent {
  height = 0;

  constructor(
    public changeDetection: ChangeDetectorRef,
    private _renderer: Renderer2
  ) {
    super(_renderer);
  }

  override activate() {
    const navbar = document.querySelector("#navbar");
    if (navbar) {
      this.height = navbar.clientHeight;
      this.changeDetection.detectChanges();
    }
  }
}
