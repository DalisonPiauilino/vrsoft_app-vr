export class CreateCursoAlunoDto {

  codigoAluno: number;
  codigoCurso: number;

  constructor(codigoAluno: number, codigoCurso: number){
    this.codigoAluno = codigoAluno;
    this.codigoCurso = codigoCurso;
  }

}
