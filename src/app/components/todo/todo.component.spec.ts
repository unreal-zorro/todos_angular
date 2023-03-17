import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TodoComponent } from "./todo.component";
import { TodoDTO } from "../../models/DTOEntities/todoDTO/todo.DTO";

describe("TodoComponent", () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  const todo: TodoDTO = new TodoDTO();
  todo._id = "1";
  todo.checked = true;
  todo.text = "Изучить основные теги";

  const handleChecked = () => true;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;

    component.checked = todo.checked;
    component.text = todo.text;
    component.onChecked = handleChecked;

    fixture.detectChanges();
  });

  it("should create checked Todo component", () => {
    expect(component).toBeTruthy();
    const TodoEl: HTMLElement = fixture.nativeElement;
    const p = TodoEl.querySelector("p");
    expect(p?.textContent).toContain(todo.text);
    const input = TodoEl.querySelector("input");
    expect(input?.checked).toBeTrue();
    const div = TodoEl.querySelector("div.card.mb-2.w-100");
    expect(div?.classList).toContain("bg-success");
    expect(div?.classList).toContain("bg-opacity-25");
  });

  it("should create unchecked Todo component", () => {
    component.checked = false;
    fixture.detectChanges();
    const TodoEl: HTMLElement = fixture.nativeElement;
    const p = TodoEl.querySelector("p");
    expect(p?.textContent).toContain(todo.text);
    const input = TodoEl.querySelector("input");
    expect(input?.checked).not.toBeTrue();
    const div = TodoEl.querySelector("div.card.mb-2.w-100");
    expect(div?.classList).not.toContain("bg-success");
    expect(div?.classList).not.toContain("bg-opacity-25");
  });

  it("should call handler in checkbox after click", async () => {
    const TodoEl: HTMLElement = fixture.nativeElement;
    const input = TodoEl.querySelector("input");
    const spy = await spyOn<HTMLInputElement | null>(input, "click" as never);
    input?.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
