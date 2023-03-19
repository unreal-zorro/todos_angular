import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NotePageComponent } from "./note-page.component";
import { NoteComponent } from "../../components/note/note.component";
import { ModalComponent } from "../../components/modal/modal.component";

describe("NotePageComponent", () => {
  let component: NotePageComponent;
  let fixture: ComponentFixture<NotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotePageComponent, NoteComponent, ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create note page without note", () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component).toBeTruthy();

    const NotePageEl: HTMLElement = fixture.nativeElement;
    const h5NoNotes: HTMLHeadElement | null = NotePageEl.querySelector(
      "h5.mb-2.text-center.text-danger"
    );
    expect(h5NoNotes?.textContent).toContain("Данной заметки не существует!!!");
  });
});
