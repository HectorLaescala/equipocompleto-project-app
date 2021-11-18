import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrarTipoRolePage } from './administrar-tipo-role.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrarTipoRolePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrarTipoRolePageRoutingModule {}
