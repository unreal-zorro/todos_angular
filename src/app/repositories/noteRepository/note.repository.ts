import { reflection } from "first-di";
import { NoteDTO } from "../../models/DTOEntities/noteDTO/note.DTO";

@reflection
export class NoteRepository {
  async requestNotes(): Promise<NoteDTO[] | void> {
    const response: string | null = localStorage.getItem("notes");
    if (response) {
      const notes: object[] = JSON.parse(response);
      return notes.map((note: object) => {
        return new NoteDTO().fromJSON(note);
      });
    }
    return new Promise<void>(resolve => resolve(void 0));
  }

  async requestNewNote(): Promise<NoteDTO> {
    const newNote = new NoteDTO();
    newNote._id = Date.now().toString();
    return new Promise<NoteDTO>(resolve => resolve(newNote));
  }

  async addNewNote(note: NoteDTO): Promise<boolean> {
    const notes: NoteDTO[] | void = await this.requestNotes();
    if (notes) {
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
      return true;
    }
    localStorage.setItem("notes", JSON.stringify([note]));
    return true;
  }

  async editExistentNote(note: NoteDTO): Promise<boolean> {
    const notes: NoteDTO[] | void = await this.requestNotes();
    if (notes) {
      const noteIndex = notes.findIndex(
        noteExisting => note._id === noteExisting._id
      );

      notes.splice(noteIndex, 1, note);
      localStorage.setItem("notes", JSON.stringify(notes));
      return true;
    }
    localStorage.setItem("notes", JSON.stringify([note]));
    return true;
  }

  async deleteExistentNote(_id: string): Promise<boolean> {
    const notes: NoteDTO[] | void = await this.requestNotes();
    if (notes) {
      const noteIndex = notes.findIndex(note => _id === note._id);

      notes.splice(noteIndex, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      return true;
    }
    return false;
  }
}
