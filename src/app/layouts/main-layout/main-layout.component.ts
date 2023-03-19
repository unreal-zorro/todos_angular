import { ChangeDetectorRef, Component, Renderer2 } from "@angular/core";
import { BaseComponent } from "../../components/base/base.component";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"]
})
export class MainLayoutComponent extends BaseComponent {
  constructor(
    public changeDetection: ChangeDetectorRef,
    private _renderer: Renderer2
  ) {
    super(_renderer);
  }
}
