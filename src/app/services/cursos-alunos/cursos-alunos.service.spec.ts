import { TestBed } from '@angular/core/testing';

import { CursosAlunosService } from './cursos-alunos.service';

describe('CursosAlunosService', () => {
  let service: CursosAlunosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosAlunosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
