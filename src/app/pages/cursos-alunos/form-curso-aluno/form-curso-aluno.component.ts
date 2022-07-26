import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import { first } from 'rxjs/operators';
import { CursosAlunosService } from 'src/app/services/cursos-alunos/cursos-alunos.service';
import { Aluno } from 'src/app/models/aluno';
import { Curso } from 'src/app/models/curso';
import { AlunosService } from 'src/app/services/alunos/alunos.service';
import { Page } from 'src/app/models/page';
import { CursoAluno } from 'src/app/models/curso-aluno';
import { CreateCursoAlunoDto } from 'src/app/models/create-curso-aluno.dto';

@Component({
  selector: 'app-form-curso-aluno',
  templateUrl: './form-curso-aluno.component.html',
  styleUrls: ['./form-curso-aluno.component.scss']
})
export class FormCursoAlunoComponent implements OnInit {

  form!: FormGroup;
  codigo!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  selectedAluno!: Aluno;
  selectedCurso!: Curso;

  listAlunos!: Array<Aluno>;
  listCursos!: Array<Curso>;

  page = new Page();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cursosAlunosService: CursosAlunosService,
    private alunosService: AlunosService,
    private cursosService: CursosService,

  ) {
    this.page.pageNumber = 0;
    this.page.size = 20;

    this.alunosService.getAlunos(this.page).subscribe(alunos =>{
      this.listAlunos = alunos.data;
      console.log(this.listAlunos);
    });
    this.cursosService.getCursos(this.page).subscribe(cursos =>{
      this.listCursos = cursos.data;
      console.log(this.listCursos);
    });

  }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo'];
    this.isAddMode = !this.codigo;

    this.form = this.formBuilder.group({
      aluno: ['', Validators.required],
      curso: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.cursosAlunosService.getById(this.codigo)
        .pipe(first())
        .subscribe((res: any) => {
          console.log(res);
          // this.selectedAluno = res.codigoAluno.nome;
          // this.selectedCurso = res.codigoCurso.descricao;
          this.form.patchValue({
            aluno: res.codigoAluno.nome,
            curso: res.codigoCurso.descricao
          });
        });
      }
  }


  onSubmit() {
    console.log(this.form);
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.selectedAluno);
    const matricula: CreateCursoAlunoDto = new CreateCursoAlunoDto(
      this.listAlunos.find((a: any) => a.nome === this.selectedAluno)!.codigo,
      this.listCursos.find((a: any) => a.descricao === this.selectedCurso)!.codigo
    );

    console.log(matricula);

    this.cursosAlunosService.saveMatricula(matricula).subscribe((res:any) => {
      console.log(res);
      this.router.navigate(['matriculas']);
    })
  }

  get f() { return this.form.controls; }

}
