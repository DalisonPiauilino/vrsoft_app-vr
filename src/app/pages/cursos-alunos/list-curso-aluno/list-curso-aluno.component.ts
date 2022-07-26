import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { CursoAluno } from 'src/app/models/curso-aluno';
import { Page } from 'src/app/models/page';
import { CursosAlunosService } from 'src/app/services/cursos-alunos/cursos-alunos.service';

@Component({
  selector: 'app-list-curso-aluno',
  templateUrl: './list-curso-aluno.component.html',
  styleUrls: ['./list-curso-aluno.component.scss']
})
export class ListCursoAlunoComponent implements OnInit {

  CursoAlunoColumns: any;

  CursoAlunoRows: CursoAluno[] = new Array<CursoAluno>();

  page = new Page();

  ColumnMode = ColumnMode;

  loadingIndicator = true;
  reorderable = true;

  constructor(
    private cursosAlunosService: CursosAlunosService,
    private router: Router,
  ) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit(): void {
    this.CursoAlunoColumns = [{ name: 'aluno' }, { name: 'curso' }, { name: 'actions' }];
    this.setCursoPage({ offset: 0 });
  }

  setCursoPage(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.cursosAlunosService.getCursos(this.page).subscribe((pagedData: any) => {
      console.log(pagedData);
      this.page = pagedData.page;
      this.CursoAlunoRows = pagedData.data;

      // this.CursoAlunoRows.map((row: any) => {
      //   console.log(row);
      // });

      this.CursoAlunoRows = this.CursoAlunoRows.map((row: any) => ({
        ...row,
        aluno: row['aluno']['nome'],
        curso: row['curso']['descricao']
      }));
      console.log(this.CursoAlunoRows);
      // this.CursoAlunoRows = this.CursoAlunoRows.map((row:any) => ({
      //   codigo: row['codigo'],
      //   aluno: row['codigoAluno'],
      //   curso: row['codigoCurso']
      // }));
    });
  }

  edit(cursoAluno: CursoAluno){
    console.log(cursoAluno);
    this.router.navigate(['matriculas', 'edit', cursoAluno.codigo]);
  }

}
