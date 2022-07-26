import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from 'src/app/models/page';
import { environment } from 'src/environments/environment';
import { Observable, of} from 'rxjs';
import { PagedData } from 'src/app/models/paged-data';
import { Curso } from 'src/app/models/curso';
import { catchError, map } from "rxjs/operators";
import { CreateCursoDto } from 'src/app/models/create-curso.dto';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(
    private http: HttpClient,
  ) { }

  getCursos(page: Page): Observable<any> {
    return this.http.get(`${environment.apiUrl}/cursos`)
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
    return this.http.get<Curso>(`${environment.apiUrl}/cursos/${codigo}`);
  }

  saveCurso(curso: CreateCursoDto): Observable<Curso>  {
    return this.http.post<Curso>(
      `${environment.apiUrl}/cursos`,
      curso
    );
  }

  updateCurso(codigo: number, curso: CreateCursoDto): Observable<Curso> {
    return this.http.patch<Curso>(
      `${environment.apiUrl}/cursos/${codigo}`,
      curso
    );
  }

  private getPagedData(data: any, page: Page): PagedData<Curso> {
    const pagedData = new PagedData<Curso>();
    page.totalElements = data.length;
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min(start + page.size, page.totalElements);
    for (let i = start; i < end; i++) {
      const jsonObj = data[i];
      const curso = new Curso(jsonObj.codigo, jsonObj.descricao, jsonObj.ementa);
      pagedData.data.push(curso);
    }
    pagedData.page = page;
    return pagedData;
  }
}
