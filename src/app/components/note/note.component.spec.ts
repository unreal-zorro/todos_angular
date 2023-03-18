import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed
} from "@angular/core/testing";

import { NoteComponent } from "./note.component";
import { AppRoutingModule } from "../../app-routing.module";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/note.DTO";
import { TodoDTO } from "../../models/DTOEntities/todoDTO/todo.DTO";
import { TodoComponent } from "../todo/todo.component";
import { By } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";
import { DebugElement } from "@angular/core";

describe("NoteComponent", () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  const todo1: TodoDTO = new TodoDTO();
  todo1._id = "1";
  todo1.checked = true;
  todo1.text = "Изучить основные теги";

  const todo2: TodoDTO = new TodoDTO();
  todo2._id = "2";
  todo2.checked = false;
  todo2.text = "Изучить атрибуты тегов";

  const todo3: TodoDTO = new TodoDTO();
  todo3._id = "3";
  todo3.checked = true;
  todo3.text = "Изучить семантические теги";

  const todo4: TodoDTO = new TodoDTO();
  todo4._id = "4";
  todo4.checked = true;
  todo4.text = "Изучить мета теги";

  const todo5: TodoDTO = new TodoDTO();
  todo5._id = "5";
  todo5.checked = false;
  todo5.text = "Изучить структуру HTML документа";

  const note: NoteDTO = new NoteDTO();
  note._id = "1";
  note.title = "Изучить HTML";
  note.todos = [todo1, todo2, todo3, todo4, todo5];

  const handleDelete = () => true;

  let linksDes: DebugElement[];
  let routerLinks: RouterLink[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [NoteComponent, TodoComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
  });

  xit("should create Note component without isOpen", () => {
    component._id = note._id;
    component.title = note.title;
    component.todos = note.todos;
    component.completed = false;
    component.onDelete = handleDelete;
    component.isOpen = false;
    component.to = "/notes";

    fixture.detectChanges();

    component.ngOnInit();

    linksDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    routerLinks = linksDes.map(de => de.injector.get(RouterLink));

    fixture.detectChanges();

    expect(component).toBeTruthy();
    const NoteEl: HTMLElement = fixture.nativeElement;
    const h5NoteTitle = NoteEl.querySelector("h5.card-title");
    expect(h5NoteTitle?.textContent).toContain(note.title);
    const pTextTodosArr = NoteEl.querySelectorAll("p.text-break.mb-0");
    expect(pTextTodosArr[0]?.textContent).toContain(note.todos[0].text);
    expect(pTextTodosArr[1]?.textContent).toContain(note.todos[1].text);
    expect(pTextTodosArr[2]?.textContent).toContain(note.todos[2].text);
    expect(pTextTodosArr[3]?.textContent).toContain(note.todos[3].text);
    expect(pTextTodosArr[4]?.textContent).toContain(note.todos[4].text);
    const inputCheckedTodosArr = NoteEl.querySelectorAll(
      "input.form-check.me-3"
    ) as unknown as HTMLInputElement[];
    expect(inputCheckedTodosArr[0]?.checked).toBeTrue();
    expect(inputCheckedTodosArr[1]?.checked).not.toBeTrue();
    expect(inputCheckedTodosArr[2]?.checked).toBeTrue();
    expect(inputCheckedTodosArr[3]?.checked).toBeTrue();
    expect(inputCheckedTodosArr[4]?.checked).not.toBeTrue();
    const divNoteCard = NoteEl.querySelector("div.card.mb-3");
    expect(divNoteCard?.classList).not.toContain("bg-warning-subtle");
    expect(divNoteCard?.classList).toContain("bg-light");
    expect(routerLinks.length).withContext("should have 1 routerLinks").toBe(1);
    expect(routerLinks[0].href).toBe("/edit/1");
  });

  xit("should create Note component with completed and isOpen", () => {
    component._id = note._id;
    component.title = note.title;
    component.todos = note.todos;
    component.completed = true;
    component.onDelete = handleDelete;
    component.isOpen = true;
    component.to = "/notes";

    fixture.detectChanges();

    component.ngOnInit();
    fixture.detectChanges();

    linksDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    routerLinks = linksDes.map(de => de.injector.get(RouterLink));

    fixture.detectChanges();

    const NoteEl: HTMLElement = fixture.nativeElement;
    const h5RestTodos = NoteEl.querySelector(
      "h5.mb-4.text-center.text-success"
    );
    expect(h5RestTodos?.textContent).toContain(
      `... Ещё осталось задач: ${5 - 3}`
    );
    const pTextTodosArr = NoteEl.querySelectorAll("p.text-break.mb-0");
    expect(pTextTodosArr[0]?.textContent).toBe(note.todos[0].text);
    expect(pTextTodosArr[1]?.textContent).toBe(note.todos[1].text);
    expect(pTextTodosArr[2]?.textContent).toBe(note.todos[2].text);
    expect(pTextTodosArr?.length).toBe(3);
    const inputCheckedTodosArr = NoteEl.querySelectorAll(
      "input.form-check.me-3"
    ) as unknown as HTMLInputElement[];
    expect(inputCheckedTodosArr[0]?.checked).toBeTrue();
    expect(inputCheckedTodosArr[1]?.checked).not.toBeTrue();
    expect(inputCheckedTodosArr[2]?.checked).toBeTrue();
    expect(inputCheckedTodosArr?.length).toBe(3);
    const divNoteCard = NoteEl.querySelector("div.card.mb-3");
    expect(divNoteCard?.classList).toContain("bg-warning-subtle");
    expect(divNoteCard?.classList).not.toContain("bg-light");
    expect(routerLinks.length).withContext("should have 2 routerLinks").toBe(2);
    expect(routerLinks[0].href).toBe("/notes/1");
  });

  it("should render Note without todos", () => {
    component._id = note._id;
    component.title = note.title;
    component.todos = [];
    component.completed = true;
    component.onDelete = handleDelete;
    component.isOpen = true;
    component.to = "/notes";

    component.ngOnInit();
    fixture.detectChanges();

    const NoteEl: HTMLElement = fixture.nativeElement;
    const h5NoteNoTodos = NoteEl.querySelector(
      "h5.mb-4.text-center.text-success"
    );
    expect(h5NoteNoTodos?.textContent).toContain(
      "Задач пока нет. Добавьте первую задачу."
    );
  });

  it("should call handler in todo checkbox after click", async () => {
    component._id = note._id;
    component.title = note.title;
    component.todos = note.todos;
    component.completed = true;
    component.onDelete = handleDelete;
    component.isOpen = true;
    component.to = "/notes";

    component.ngOnInit();
    fixture.detectChanges();

    const TodoEl: HTMLElement = fixture.nativeElement;
    const buttonDelete = TodoEl.querySelector("button");
    const spy = await spyOn<HTMLButtonElement | null>(
      buttonDelete,
      "click" as never
    );
    buttonDelete?.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

//   @Component({
//     selector: "app-host-component",
//     template: ` <app-note
//       _id="_id"
//       title="title"
//       todos="todos"
//       completed="completed"
//       onDelete="onDelete"
//       isOpen="isOpen"
//       to="to"
//     ></app-note>`
//   })
//   class TestHostComponent {
//     private _id?: string;
//     private title?: string;
//     private todos?: TodoDTO[];
//     private completed?: boolean;
//     private onDelete?: () => void;
//     private isOpen?: boolean;
//     private to?: string;
//
//     setId(newId: string) {
//       this._id = newId;
//     }
//
//     setTitle(newTitle: string) {
//       this.title = newTitle;
//     }
//
//     setTodos(newTodos: TodoDTO[]) {
//       this.todos = JSON.parse(JSON.stringify(newTodos));
//     }
//
//     setCompleted(newCompleted: boolean) {
//       this.completed = newCompleted;
//     }
//
//     setOnDelete(newOnDelete: () => void) {
//       this.onDelete = newOnDelete;
//     }
//
//     setIsOpen(newIsOpen: boolean) {
//       this.isOpen = newIsOpen;
//     }
//
//     setTo(newTo: string) {
//       this.to = newTo;
//     }
//   }
