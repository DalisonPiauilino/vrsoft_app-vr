export class Curso {
  codigo: number;
  descricao: string;
  ementa: string;


  constructor(codigo: number, descricao: string, ementa: string ) {
    this.codigo = codigo;
    this.descricao = descricao;
    this.ementa = ementa;
  }
}
