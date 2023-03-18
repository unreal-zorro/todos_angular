import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from "@angular/core/testing";

import { ModalComponent } from "./modal.component";
import { AppRoutingModule } from "../../app-routing.module";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { provideRouter, Router, RouterLink } from "@angular/router";
import { By } from "@angular/platform-browser";

describe("ModalComponent", () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let linksDes: DebugElement[];
  let routerLinks: RouterLink[];

  const saveHandler = () => {};
  const closeHandler = () => {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [ModalComponent],
      providers: [provideRouter([])],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it("should create modal component without okIsLink", () => {
    component.show = true;
    component.title = "Заголовок модального окна";
    component.text = "Текст в модальном окне";
    component.textOkButton = "Кнопка ОК";
    component.textCancelButton = "Кнопка Отмена";
    component.handleSave = saveHandler;
    component.handleClose = closeHandler;
    component.okIsLink = false;
    component.to = "/notes";

    fixture.detectChanges();

    linksDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    routerLinks = linksDes.map(de => de.injector.get(RouterLink));

    fixture.detectChanges();

    expect(component).toBeTruthy();
    const ModalEl: HTMLElement = fixture.nativeElement;
    const rootDiv: NodeListOf<HTMLDivElement> | null =
      ModalEl.querySelectorAll("div");
    expect(rootDiv[1]?.classList).not.toContain("d-none");
    const h5Title: HTMLTitleElement | null =
      ModalEl.querySelector("h5.modal-title");
    expect(h5Title?.textContent).toContain("Заголовок модального окна");
    const pText: HTMLParagraphElement | null =
      ModalEl.querySelector("div.modal-body > p");
    expect(pText?.textContent).toContain("Текст в модальном окне");
    const okButton: HTMLButtonElement | null = ModalEl.querySelector(
      "button.btn.btn-success"
    );
    expect(okButton?.textContent).toContain("Кнопка ОК");
    const cancelButton: HTMLButtonElement | null = ModalEl.querySelector(
      "button.btn.btn-danger"
    );
    expect(cancelButton?.textContent).toContain("Кнопка Отмена");
  });

  it("should call save handler after click OK button", async () => {
    fixture.detectChanges();

    const ModalEl: HTMLElement = fixture.nativeElement;
    const okButton: HTMLButtonElement | null = ModalEl.querySelector(
      "button.btn.btn-success"
    );
    const spy = await spyOn<HTMLButtonElement | null>(
      okButton,
      "click" as never
    );
    okButton?.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should call delete handler after click CANCEL button", async () => {
    fixture.detectChanges();

    const ModalEl: HTMLElement = fixture.nativeElement;
    const cancelButton: HTMLButtonElement | null = ModalEl.querySelector(
      "button.btn.btn-danger"
    );
    const spy = await spyOn<HTMLButtonElement | null>(
      cancelButton,
      "click" as never
    );
    cancelButton?.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should create modal component with okIsLink and to", () => {
    component.show = true;
    component.title = "Заголовок модального окна";
    component.text = "Текст в модальном окне";
    component.textOkButton = "Кнопка ОК";
    component.textCancelButton = "Кнопка Отмена";
    component.handleSave = saveHandler;
    component.handleClose = closeHandler;
    component.okIsLink = true;
    component.to = "/notes";

    fixture.detectChanges();

    linksDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    routerLinks = linksDes.map(de => de.injector.get(RouterLink));

    fixture.detectChanges();

    expect(routerLinks.length).withContext("should have 1 routerLinks").toBe(1);

    const ModalEl: HTMLElement = fixture.nativeElement;
    const okLink: HTMLLinkElement | null =
      ModalEl.querySelector("a.btn.btn-success");
    expect(okLink?.textContent).toContain("Кнопка ОК");
  });

  it("should change address after click on OK link", fakeAsync(() => {
    component.show = true;
    component.title = "Заголовок модального окна";
    component.text = "Текст в модальном окне";
    component.textOkButton = "Кнопка ОК";
    component.textCancelButton = "Кнопка Отмена";
    component.handleSave = saveHandler;
    component.handleClose = closeHandler;
    component.okIsLink = true;
    component.to = "/notes";

    fixture.detectChanges();

    linksDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    routerLinks = linksDes.map(de => de.injector.get(RouterLink));

    fixture.detectChanges();

    const link = linksDes[0];
    TestBed.inject(Router).resetConfig([{ path: "**", children: [] }]);
    link.triggerEventHandler("click", { button: 0 });
    tick();
    fixture.detectChanges();
    expect(TestBed.inject(Router).url).toBe("/notes");
  }));
});
