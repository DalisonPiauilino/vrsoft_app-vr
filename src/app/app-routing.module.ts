import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const cursosModule = () => import('./pages/cursos/cursos.module').then(x => x.CursosModule);
const alunosModule = () => import('./pages/alunos/alunos.module').then(x => x.AlunosModule);
const cursosAlunosModule = () => import('./pages/cursos-alunos/cursos-alunos.module').then(x => x.CursosAlunosModule);

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'cursos', loadChildren: cursosModule },
  { path: 'alunos', loadChildren: alunosModule },
  { path: 'matriculas', loadChildren: cursosAlunosModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
