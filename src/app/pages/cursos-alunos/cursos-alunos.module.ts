import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ListCursoAlunoComponent } from './list-curso-aluno/list-curso-aluno.component';
import { FormCursoAlunoComponent } from './form-curso-aluno/form-curso-aluno.component';
import { CursosAlunosRoutingModule } from './cursos-alunos-routing.module';


@NgModule({
  declarations: [
    FormCursoAlunoComponent,
    ListCursoAlunoComponent
  ],
  imports: [
    CommonModule,
    CursosAlunosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class CursosAlunosModule { }
