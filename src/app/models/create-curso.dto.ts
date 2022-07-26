export class CreateCursoDto {
  descricao: string;
  ementa: string;

  constructor(descricao: string,ementa: string) {
    this.descricao = descricao;
    this.ementa = ementa;
  }
}
