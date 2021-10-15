import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisEquiposPage } from './mis-equipos.page';

const routes: Routes = [
  {
    path: '',
    component: MisEquiposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisEquiposPageRoutingModule {}
