import { jsonProperty, Serializable } from "ts-serializable";
import "reflect-metadata";

export class TodoDTO extends Serializable {
  @jsonProperty(String)
  _id = "";

  @jsonProperty(Boolean)
  checked = false;

  @jsonProperty(String)
  text = "";
}
