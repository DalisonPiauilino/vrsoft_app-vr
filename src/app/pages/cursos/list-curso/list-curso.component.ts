import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Curso } from 'src/app/models/curso';
import { Page } from 'src/app/models/page';
import { CursosService } from 'src/app/services/cursos/cursos.service';

@Component({
  selector: 'app-list-curso',
  templateUrl: './list-curso.component.html',
  styleUrls: ['./list-curso.component.scss']
})
export class ListCursoComponent implements OnInit {

  CursoColumns: any;

  CursoRows: Curso[] = new Array<Curso>();

  page = new Page();

  ColumnMode = ColumnMode;

  loadingIndicator = true;
  reorderable = true;

  constructor(
    private cursosService: CursosService,
    private router: Router,
  ) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit(): void {
    this.CursoColumns = [{ name: 'descricao' }, { name: 'ementa' }, { name: 'actions' }];
    this.setCursoPage({ offset: 0 });
  }

  setCursoPage(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.cursosService.getCursos(this.page).subscribe((pagedData: any) => {
      console.log(pagedData);
      this.page = pagedData.page;
      this.CursoRows = pagedData.data;
    });
  }

  edit(curso: Curso){
    console.log(curso);
    this.router.navigate(['cursos', 'edit', curso.codigo]);
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
