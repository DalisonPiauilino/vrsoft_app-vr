import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCursoAlunoComponent } from './form-curso-aluno.component';

describe('FormCursoAlunoComponent', () => {
  let component: FormCursoAlunoComponent;
  let fixture: ComponentFixture<FormCursoAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCursoAlunoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCursoAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
