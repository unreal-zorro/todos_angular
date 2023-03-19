import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { NoteListPageComponent } from "./pages/note-list-page/note-list-page.component";
import { NewNotePageComponent } from "./pages/new-note-page/new-note-page.component";
import { NotePageComponent } from "./pages/note-page/note-page.component";
import { EditNotePageComponent } from "./pages/edit-note-page/edit-note-page.component";

const routes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "notes", component: NoteListPageComponent },
  { path: "notes/:id", component: NotePageComponent },
  { path: "new", component: NewNotePageComponent },
  { path: "edit/:id", component: EditNotePageComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
