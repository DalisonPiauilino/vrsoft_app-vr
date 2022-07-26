import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreateCursoAlunoDto } from 'src/app/models/create-curso-aluno.dto';
import { CursoAluno } from 'src/app/models/curso-aluno';
import { Page } from 'src/app/models/page';
import { PagedData } from 'src/app/models/paged-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosAlunosService {

  constructor(
    private http: HttpClient,
  ) { }

  getCursos(page: Page): Observable<any> {
    return this.http.get(`${environment.apiUrl}/cursos-alunos`)
      .pipe(
        map((data) => {
          return this.getPagedData(data, page);
        }),
        catchError(val => {
          return of(val)
        }),
      );
  }

  getById(codigo: number) {
    return this.http.get<CursoAluno>(`${environment.apiUrl}/cursos-alunos/${codigo}`);
  }

  saveMatricula(matricula: CreateCursoAlunoDto): Observable<CursoAluno> {
    return this.http.post<CursoAluno>(
      `${environment.apiUrl}/cursos-alunos`,
      matricula
    );
  }

  private getPagedData(data: any, page: Page): PagedData<CursoAluno> {
    const pagedData = new PagedData<CursoAluno>();
    page.totalElements = data.length;
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min(start + page.size, page.totalElements);
    for (let i = start; i < end; i++) {
      const jsonObj = data[i];
      const cursoAluno = new CursoAluno(jsonObj.codigo, jsonObj.codigoAluno, jsonObj.codigoCurso);
      pagedData.data.push(cursoAluno);
    }
    pagedData.page = page;
    return pagedData;
  }
}
