import { TodoDTO } from "./todo.DTO";

let todo: TodoDTO | null = null;
beforeEach(() => {
  todo = new TodoDTO();
});

afterEach(() => {
  todo = null;
});

describe("Todo DTO", () => {
  it("should property '_id' to be ''", () => {
    expect(todo?._id).toBe("");
  });

  it("should property 'checked' to be false", () => {
    expect(todo?.checked).toBeFalsy();
  });

  it("should property 'text' to be ''", () => {
    expect(todo?.text).toBe("");
  });
});
