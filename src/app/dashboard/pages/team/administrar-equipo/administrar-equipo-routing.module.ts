import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrarEquipoPage } from './administrar-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrarEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrarEquipoPageRoutingModule {}
