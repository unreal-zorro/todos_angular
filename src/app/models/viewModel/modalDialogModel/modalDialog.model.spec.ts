import { ModalDialogModel } from "./modalDialog.model";

let modalDialog: ModalDialogModel | null = null;

beforeEach(() => {
  modalDialog = new ModalDialogModel();
});

afterEach(() => {
  modalDialog = null;
});

describe("ModalDialog Model", () => {
  it("should property 'show' to be false", () => {
    expect(modalDialog?.show).toBeFalsy();
  });

  it("should property 'title' to be ''", () => {
    expect(modalDialog?.title).toBe("");
  });

  it("should property 'text' to be ''", () => {
    expect(modalDialog?.text).toBe("");
  });

  it("should property 'textOkButton' to be ''", () => {
    expect(modalDialog?.textOkButton).toBe("");
  });

  it("should property 'textCancelButton' to be ''", () => {
    expect(modalDialog?.textCancelButton).toBe("");
  });

  it("should method 'handleSave' to be function", () => {
    expect(typeof modalDialog?.handleSave).toBe("function");
  });

  it("should method 'handleClose' to be function", () => {
    expect(typeof modalDialog?.handleClose).toBe("function");
  });

  it("should property 'okIsLink' to be true", () => {
    expect(modalDialog?.okIsLink).toBeTruthy();
  });

  it("should property 'to' to be ''", () => {
    expect(modalDialog?.to).toBe("");
  });
});
