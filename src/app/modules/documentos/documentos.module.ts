import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentosRoutingModule } from './documentos-routing.module';
import { DocumentosComponent } from './documentos.component';
import { FiltroComponent } from './filtro/filtro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DeleteComponent } from './delete/delete.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    DocumentosComponent,
    FiltroComponent,
    DetalhesComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    DocumentosRoutingModule,
    FontAwesomeModule,
    FormsModule,
    TableModule,
    DragDropModule
  ]
})
export class DocumentosModule { }
