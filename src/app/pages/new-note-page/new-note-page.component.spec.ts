import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NewNotePageComponent } from "./new-note-page.component";
import { EditNoteComponent } from "../../components/edit-note/edit-note.component";
import { ModalComponent } from "../../components/modal/modal.component";

describe("NewNotePageComponent", () => {
  let component: NewNotePageComponent;
  let fixture: ComponentFixture<NewNotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewNotePageComponent, EditNoteComponent, ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NewNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();

    const NewNoteEl: HTMLElement = fixture.nativeElement;
    const h1Title: HTMLHeadElement | null = NewNoteEl.querySelector(
      "h1.text-center.mt-3"
    );
    expect(h1Title?.textContent).toContain("Создание заметки!");
  });
});
