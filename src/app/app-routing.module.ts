import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientCreateComponent } from './components/client-create/client-create.component';
import { ClientListComponent } from './components/client-list/client-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'client-list', pathMatch: 'full'},
  { path: 'client-list', component: ClientListComponent},
  { path: 'client-create', component: ClientCreateComponent},
  { path: '**', redirectTo: 'client-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
