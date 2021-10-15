import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitarJugadoresPage } from './invitar-jugadores.page';

const routes: Routes = [
  {
    path: '',
    component: InvitarJugadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitarJugadoresPageRoutingModule {}
