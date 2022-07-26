import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos/cursos.service';
import { first } from 'rxjs/operators';
import { Curso } from 'src/app/models/curso';
import { CreateCursoDto } from 'src/app/models/create-curso.dto';

@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.scss']
})
export class FormCursoComponent implements OnInit {

  form!: FormGroup;
  codigo!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) { }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo'];
    this.isAddMode = !this.codigo;

    this.form = this.formBuilder.group({
      descricao: ['', Validators.required],
      ementa: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.cursosService.getById(this.codigo)
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

    const curso: CreateCursoDto = new CreateCursoDto(this.form.get('descricao')?.value, this.form.get('ementa')?.value)

    if (!this.isAddMode){
      this.cursosService.updateCurso(this.codigo, curso).subscribe(res => {
        console.log(res);
        this.router.navigate(['cursos']);
      });
    } else {
      this.cursosService.saveCurso(curso).subscribe(res => {
        console.log(res);
        this.router.navigate(['cursos']);
      });
    }
  }

  get f() { return this.form.controls; }

}
