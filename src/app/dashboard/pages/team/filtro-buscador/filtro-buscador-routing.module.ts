import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroBuscadorPage } from './filtro-buscador.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroBuscadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltroBuscadorPageRoutingModule {}
