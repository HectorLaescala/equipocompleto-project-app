import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalWithOptionsPage } from './modal-with-options.page';

const routes: Routes = [
  {
    path: '',
    component: ModalWithOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalWithOptionsPageRoutingModule {}
