import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Aluno } from 'src/app/models/aluno';
import { Page } from 'src/app/models/page';
import { AlunosService } from 'src/app/services/alunos/alunos.service';

@Component({
  selector: 'app-list-aluno',
  templateUrl: './list-aluno.component.html',
  styleUrls: ['./list-aluno.component.scss']
})
export class ListAlunoComponent implements OnInit {

  AlunoColumns: any;

  AlunoRows: Aluno[] = new Array<Aluno>();

  page = new Page();

  ColumnMode = ColumnMode;

  loadingIndicator = true;
  reorderable = true;

  constructor(
    private alunosService: AlunosService,
    private router: Router,
  ) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit(): void {
    this.AlunoColumns = [{ name: 'nome' }, { name: 'actions' }];
    this.setAlunoPage({ offset: 0 });
  }

  setAlunoPage(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.alunosService.getAlunos(this.page).subscribe((pagedData: any) => {
      console.log(pagedData);
      this.page = pagedData.page;
      this.AlunoRows = pagedData.data;
    });
  }

  edit(aluno: Aluno){
    console.log(aluno);
    this.router.navigate(['alunos', 'edit', aluno.codigo]);
  }

  printData() {
    let printContents = document.getElementById("myTable")!.innerHTML;

    let WindowObject = window.open('', "PrintWindow", "width=700,height=850,top=200,left=200,toolbars=no,scrollbars=no,status=no,resizable=no");
    WindowObject!.document.writeln(printContents);
    WindowObject!.document.close();
    WindowObject!.focus();
    WindowObject!.print();
    WindowObject!.close();
  }

}
