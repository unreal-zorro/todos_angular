import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditNotePageComponent } from "./edit-note-page.component";
import { EditNoteComponent } from "../../components/edit-note/edit-note.component";
import { ModalComponent } from "../../components/modal/modal.component";

describe("EditNotePageComponent", () => {
  let component: EditNotePageComponent;
  let fixture: ComponentFixture<EditNotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditNotePageComponent, EditNoteComponent, ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EditNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();

    const EditNoteEl: HTMLElement = fixture.nativeElement;
    const h1Title: HTMLHeadElement | null = EditNoteEl.querySelector(
      "h1.text-center.mt-3"
    );
    expect(h1Title?.textContent).toContain("Изменение заметки!");
  });
});
