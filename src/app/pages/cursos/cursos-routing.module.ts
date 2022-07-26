import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCursoComponent } from './form-curso/form-curso.component';
import { ListCursoComponent } from './list-curso/list-curso.component';

const routes: Routes = [
  { path: '', component: ListCursoComponent },
  { path: 'add', component: FormCursoComponent },
  { path: 'edit/:codigo', component: FormCursoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
