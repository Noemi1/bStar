import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { DocumentosComponent } from './documentos.component';
import { FiltroComponent } from './filtro/filtro.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: DocumentosComponent, children: [
    { path: 'filtro', component: FiltroComponent },
    { path: 'cadastrar', component: FormComponent },
    { path: 'cadastrar/cadastrar', component: FormComponent },
    { path: 'editar/:id', component: FormComponent },
    { path: 'excluir/:id', component: DeleteComponent },
  ],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentosRoutingModule { }
