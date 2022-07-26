import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCursoAlunoComponent } from './form-curso-aluno/form-curso-aluno.component';
import { ListCursoAlunoComponent } from './list-curso-aluno/list-curso-aluno.component';
const routes: Routes = [
  { path: '', component: ListCursoAlunoComponent },
  { path: 'add', component: FormCursoAlunoComponent },
  { path: 'edit/:codigo', component: FormCursoAlunoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosAlunosRoutingModule { }
