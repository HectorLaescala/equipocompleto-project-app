import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalOptionAceptedPage } from './modal-option-acepted.page';

const routes: Routes = [
  {
    path: '',
    component: ModalOptionAceptedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalOptionAceptedPageRoutingModule {}
