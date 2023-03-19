import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MainPageComponent } from "./main-page.component";

describe("MainPageComponent", () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create main page without notes", () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component).toBeTruthy();

    const MainPageEl: HTMLElement = fixture.nativeElement;
    const h3NoNotes: HTMLHeadElement | null = MainPageEl.querySelector(
      "h3.text-center.mt-2.text-danger"
    );
    expect(h3NoNotes?.textContent).toContain("Заметок пока нет!!!");
  });
});
