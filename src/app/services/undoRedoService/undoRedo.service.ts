import { Inject, Injectable } from "@angular/core";
import { reflection } from "first-di";

@Injectable({
  providedIn: "root"
})
@reflection
export class UndoRedoService<T> {
  private state: T[] = [];
  private undoSteps = 0;
  private redoSteps = 0;

  constructor(@Inject(Number) private readonly maxLength: number) {
    localStorage.removeItem("notesStore");
  }

  length(): number {
    return this.state.length;
  }

  add(state: T): { undoSteps: number; redoSteps: number } {
    if (this.length() || this.undoSteps) {
      const response: string | null = localStorage.getItem("notesStore");
      if (response) {
        const notes: T[] = JSON.parse(response);
        this.state = notes;
      }
      this.state.push(state);
      this.undoSteps++;

      if (this.state.length > this.maxLength + 1) {
        if (this.undoSteps >= this.maxLength) {
          this.undoSteps = this.maxLength;
        }
        this.state.shift();
      }

      localStorage.setItem("notesStore", JSON.stringify(this.state));
      this.redoSteps = 0;
    } else {
      this.state.push(state);
      localStorage.setItem("notesStore", JSON.stringify(this.state));
      this.undoSteps = 0;
      this.redoSteps = 0;
    }

    return {
      undoSteps: this.undoSteps,
      redoSteps: this.redoSteps
    };
  }

  undo(): { undoSteps: number; redoSteps: number; state: T } {
    if (this.undoSteps > 0) {
      const response: string | null = localStorage.getItem("notesStore");
      if (response) {
        const notes: T[] = JSON.parse(response);
        this.state = notes;
      }
      localStorage.setItem("notesStore", JSON.stringify(this.state));
      this.undoSteps--;
      this.redoSteps++;

      return {
        undoSteps: this.undoSteps,
        redoSteps: this.redoSteps,
        state: this.state[this.undoSteps]
      };
    }
    return {
      undoSteps: this.undoSteps,
      redoSteps: this.redoSteps,
      state: this.state[0]
    };
  }

  redo(): { undoSteps: number; redoSteps: number; state: T } {
    if (this.redoSteps > 0) {
      const response: string | null = localStorage.getItem("notesStore");
      if (response) {
        const notes: T[] = JSON.parse(response);
        this.state = notes;
      }
      localStorage.setItem("notesStore", JSON.stringify(this.state));
      this.undoSteps++;
      this.redoSteps--;

      return {
        undoSteps: this.undoSteps,
        redoSteps: this.redoSteps,
        state: this.state[this.undoSteps]
      };
    }
    return {
      undoSteps: this.undoSteps,
      redoSteps: this.redoSteps,
      state: this.state[0]
    };
  }
}
