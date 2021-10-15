import { CUSTOM_ELEMENTS_SCHEMA, NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalOptionAceptedPageRoutingModule } from './modal-option-acepted-routing.module';

import { ModalOptionAceptedPage } from './modal-option-acepted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalOptionAceptedPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ModalOptionAceptedPage]
})
export class ModalOptionAceptedPageModule {}
