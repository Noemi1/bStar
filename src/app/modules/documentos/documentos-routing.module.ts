import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParamsGuard } from 'src/app/helpers/params.guard';
import { DeleteComponent } from './delete/delete.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { DocumentosComponent } from './documentos.component';
import { FiltroComponent } from './filtro/filtro.component';

const routes: Routes = [
  { path: '', component: DocumentosComponent, children: [
    { path: 'filtro', component: FiltroComponent },
    { path: 'cadastrar', component: DetalhesComponent },
    { path: 'editar/:id', component: DetalhesComponent, canActivate: [ ParamsGuard ], data: { params: ['id'], returnUrl: '' } },
    { path: 'ver-mais/:id', component: DetalhesComponent, canActivate: [ ParamsGuard ], data: { params: ['id'], returnUrl: '' } },
    { path: 'excluir/:id', component: DeleteComponent, canActivate: [ ParamsGuard ], data: { params: ['id'], returnUrl: '' } },
  ],},

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentosRoutingModule { }
