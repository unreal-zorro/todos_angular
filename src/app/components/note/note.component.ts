import { ChangeDetectorRef, Component, Input, Renderer2 } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { TodoDTO } from "../../models/DTOEntities/todoDTO/todo.DTO";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent extends BaseComponent {
  @Input() _id?: string;
  @Input() title?: string;
  @Input() todos?: TodoDTO[];
  @Input() completed?: boolean;
  @Input() onDelete?: () => void;
  @Input() isOpen?: boolean;
  @Input() to?: string;

  innerTodos: TodoDTO[] | void = void 0;
  numberOfRestTodos = 0;

  constructor(
    public changeDetection: ChangeDetectorRef,
    private _renderer: Renderer2
  ) {
    super(_renderer);
  }

  override activate() {
    super.activate();
    if (this.todos && this.todos?.length) {
      this.innerTodos = this.todos;

      if (this.isOpen && this.todos?.length > 3) {
        this.numberOfRestTodos = this.todos?.length - 3;
        this.innerTodos.splice(3, this.todos?.length - 3);
      }
    }

    this.changeDetection.detectChanges();
  }

  checkedHandler = (todo: TodoDTO) => () => !todo.checked;
}
