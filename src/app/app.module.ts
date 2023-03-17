import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BaseComponent } from "./components/base/base.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TodoComponent } from './components/todo/todo.component';
import { NoteComponent } from './components/note/note.component';

@NgModule({
  declarations: [AppComponent, BaseComponent, NavbarComponent, TodoComponent, NoteComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
