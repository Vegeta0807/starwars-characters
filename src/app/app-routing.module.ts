import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'characters', component: AppComponent },
  { path: 'characters/:id', component: CharacterDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
