import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from 'src/app/models/page';
import { environment } from 'src/environments/environment';
import { Observable, of} from 'rxjs';
import { PagedData } from 'src/app/models/paged-data';
import { Aluno } from 'src/app/models/aluno';
import { catchError, map } from "rxjs/operators";
import { CreateAlunoDto } from 'src/app/models/create-aluno.dto';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  constructor(
    private http: HttpClient,
  ) { }

  getAlunos(page: Page): Observable<any> {
    return this.http.get(`${environment.apiUrl}/alunos`)
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
    return this.http.get<Aluno>(`${environment.apiUrl}/alunos/${codigo}`);
  }

  saveAluno(aluno: CreateAlunoDto): Observable<Aluno> {
    return this.http.post<Aluno>(
      `${environment.apiUrl}/alunos`,
      aluno
    );
  }

  updateAluno(codigo: number, aluno: CreateAlunoDto): Observable<Aluno> {
    return this.http.patch<Aluno>(
      `${environment.apiUrl}/alunos/${codigo}`,
      aluno
    );
  }

  private getPagedData(data: any, page: Page): PagedData<Aluno> {
    const pagedData = new PagedData<Aluno>();
    page.totalElements = data.length;
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min(start + page.size, page.totalElements);
    for (let i = start; i < end; i++) {
      const jsonObj = data[i];
      const aluno = new Aluno(jsonObj.codigo, jsonObj.nome);
      pagedData.data.push(aluno);
    }
    pagedData.page = page;
    return pagedData;
  }
}
