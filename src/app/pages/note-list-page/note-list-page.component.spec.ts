import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NoteListPageComponent } from "./note-list-page.component";
import { NoteComponent } from "../../components/note/note.component";
import { ModalComponent } from "../../components/modal/modal.component";

describe("NoteListPageComponent", () => {
  let component: NoteListPageComponent;
  let fixture: ComponentFixture<NoteListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteListPageComponent, NoteComponent, ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create without notes", () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component).toBeTruthy();

    const NoteListPageEl: HTMLElement = fixture.nativeElement;
    const h2NoNotes: HTMLHeadElement | null = NoteListPageEl.querySelector(
      "h2.mb-4.text-center.text-warning"
    );
    expect(h2NoNotes?.textContent).toContain(
      "Заметок пока нет. Добавьте первую заметку."
    );
  });
});
