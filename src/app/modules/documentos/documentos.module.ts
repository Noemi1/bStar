import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentosRoutingModule } from './documentos-routing.module';
import { DocumentosComponent } from './documentos.component';
import { FiltroComponent } from './filtro/filtro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    DocumentosComponent,
    FiltroComponent,
    FormComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    DocumentosRoutingModule,
    FontAwesomeModule,
    FormsModule,
    TableModule,
  ]
})
export class DocumentosModule { }
