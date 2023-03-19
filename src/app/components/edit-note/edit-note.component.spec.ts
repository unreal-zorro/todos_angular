import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditNoteComponent } from "./edit-note.component";
import { ModalComponent } from "../modal/modal.component";
import { Router } from "@angular/router";
import { NoteService } from "../../services/noteService/note.service";
import { UndoRedoService } from "../../services/undoRedoService/undoRedo.service";
import { NoteRepository } from "../../repositories/noteRepository/note.repository";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/note.DTO";

describe("EditNoteComponent", () => {
  let component: EditNoteComponent;
  let fixture: ComponentFixture<EditNoteComponent>;

  let noteService: NoteService;
  let undoRedoService: UndoRedoService<NoteDTO | void>;

  const routerSpyNew = { navigate: jasmine.createSpy("/new") };
  const routerSpyEdit = { navigate: jasmine.createSpy("/edit/1") };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditNoteComponent, ModalComponent],
      // providers: [{ provide: LOCATION_TOKEN, useValue: window.location }]
      providers: [
        { provide: NoteService, useValue: NoteService },
        { provide: UndoRedoService, useValue: UndoRedoService },
        { provide: Router, useValue: routerSpyNew },
        { provide: Router, useValue: routerSpyEdit }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditNoteComponent);
    component = fixture.componentInstance;

    noteService = new NoteService(new NoteRepository());
    undoRedoService = new UndoRedoService<NoteDTO | void>(5);

    fixture.detectChanges();
  });

  it("should create empty Edit note", async () => {
    await spyOn(component, "getPathname").and.returnValue("/new");
    // spyOn(noteService, "getPathname").and.returnValue("/new");
    // spyOn(undoRedoService, "getPathname").and.returnValue("/new");

    component.ngOnInit();
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.getPathname()).toBe("/new");

    const EditNoteEl: HTMLElement = fixture.nativeElement;
    const h5NoTodos: HTMLHeadElement | null = EditNoteEl.querySelector("h5");
    expect(h5NoTodos?.textContent).toContain("Данной заметки не существует!!!");
    // expect(component.note).toBeTruthy();
  });
});
