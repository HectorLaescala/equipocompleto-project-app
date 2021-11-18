import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilEquipoPage } from './perfil-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilEquipoPageRoutingModule {}
