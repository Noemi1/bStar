import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentosComponent } from './modules/documentos/documentos.component';

const documentos = () => import('./modules/documentos/documentos.module').then(x => x.DocumentosModule);

const routes: Routes = [
  { path: '', loadChildren: documentos },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
