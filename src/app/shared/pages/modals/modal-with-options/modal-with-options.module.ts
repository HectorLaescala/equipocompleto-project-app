import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalWithOptionsPageRoutingModule } from './modal-with-options-routing.module';

import { ModalWithOptionsPage } from './modal-with-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalWithOptionsPageRoutingModule
  ],
  declarations: [ModalWithOptionsPage]
})
export class ModalWithOptionsPageModule {}
