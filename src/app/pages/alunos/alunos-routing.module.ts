import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAlunoComponent } from './form-aluno/form-aluno.component';
import { ListAlunoComponent } from './list-aluno/list-aluno.component';

const routes: Routes = [
  { path: '', component: ListAlunoComponent },
  { path: 'add', component: FormAlunoComponent },
  { path: 'edit/:codigo', component: FormAlunoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
