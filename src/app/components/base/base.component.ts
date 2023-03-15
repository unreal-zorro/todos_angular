import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-base",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./base.component.html",
  styleUrls: ["./base.component.scss"]
})
export class BaseComponent
  implements AfterViewInit, OnInit, OnChanges, OnDestroy
{
  @ViewChild("view") view?: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.activate && this.activate();
  }

  ngOnChanges(): boolean {
    return this.update();
  }

  ngOnDestroy(): void {
    this.dispose();
  }

  activate(): void {
    return undefined;
  }

  update() {
    return false;
  }

  dispose(): void {
    return undefined;
  }

  ngAfterViewInit(): void {
    try {
      if (!this.view) {
        const divElement = this.renderer.createElement("div");
        const text = this.renderer.createText("Представление не определено");
        this.renderer.appendChild(divElement, text);
        const rootElement = this.renderer.selectRootElement("div", true);
        this.renderer.appendChild(rootElement, divElement);
      }
    } catch (e) {
      const divElement = this.renderer.createElement("div");
      this.renderer.setStyle(divElement, "color", "red");
      const text = this.renderer.createText(
        `В этом компоненте произошла ошибка: ${e}`
      );
      this.renderer.appendChild(divElement, text);
      const rootElement = this.renderer.selectRootElement("div", true);
      this.renderer.appendChild(rootElement, divElement);
    }
  }
}
