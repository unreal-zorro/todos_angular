import { NoteDTO } from "./note.DTO";

let note: NoteDTO | null = null;
beforeEach(() => {
  note = new NoteDTO();
});

afterEach(() => {
  note = null;
});

describe("Note DTO", () => {
  it("should property '_id' to be ''", () => {
    expect(note?._id).toBe("");
  });

  it("should property 'title' to be ''", () => {
    expect(note?.title).toBe("");
  });

  it("should property 'todos' to be []", () => {
    expect(note?.todos).toEqual([]);
  });
});
