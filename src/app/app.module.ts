import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BaseComponent } from "./components/base/base.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TodoComponent } from "./components/todo/todo.component";
import { NoteComponent } from "./components/note/note.component";
import { ModalComponent } from "./components/modal/modal.component";
import { EditNoteComponent } from "./components/edit-note/edit-note.component";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotePageComponent } from './pages/note-page/note-page.component';
import { NoteListPageComponent } from './pages/note-list-page/note-list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    NavbarComponent,
    TodoComponent,
    NoteComponent,
    ModalComponent,
    EditNoteComponent,
    MainPageComponent,
    NotePageComponent,
    NoteListPageComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
