import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CreateAlunoDto } from 'src/app/models/create-aluno.dto';
import { AlunosService } from 'src/app/services/alunos/alunos.service';

@Component({
  selector: 'app-form-aluno',
  templateUrl: './form-aluno.component.html',
  styleUrls: ['./form-aluno.component.scss']
})
export class FormAlunoComponent implements OnInit {

  form!: FormGroup;
  codigo!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService
  ) { }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo'];
    this.isAddMode = !this.codigo;

    this.form = this.formBuilder.group({
      nome: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.alunosService.getById(this.codigo)
        .pipe(first())
        .subscribe(res => this.form.patchValue(res));
    }
  }


  onSubmit() {
    console.log(this.form);
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const aluno: CreateAlunoDto = new CreateAlunoDto(this.form.get('nome')?.value)

    if (!this.isAddMode) {
      this.alunosService.updateAluno(this.codigo, aluno).subscribe(res => {
        console.log(res);
        this.router.navigate(['alunos']);
      });
    } else {
      this.alunosService.saveAluno(aluno).subscribe(res => {
        console.log(res);
        this.router.navigate(['alunos']);
      });
    }
  }

  get f() { return this.form.controls; }

}
