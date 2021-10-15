import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearEquipoPage } from './crear-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: CrearEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearEquipoPageRoutingModule {}
