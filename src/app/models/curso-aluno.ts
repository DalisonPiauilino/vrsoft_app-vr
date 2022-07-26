import { Aluno } from "./aluno";
import { Curso } from "./curso";

export class CursoAluno {
  codigo: number;
  aluno: Aluno;
  curso: Curso;

  constructor(codigo:number, aluno: Aluno, curso: Curso) {
    this.codigo = codigo;
    this.aluno = aluno;
    this.curso = curso;
  }
}
