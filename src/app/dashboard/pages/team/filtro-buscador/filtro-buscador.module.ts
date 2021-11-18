import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroBuscadorPageRoutingModule } from './filtro-buscador-routing.module';

import { FiltroBuscadorPage } from './filtro-buscador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroBuscadorPageRoutingModule
  ],
  declarations: [FiltroBuscadorPage]
})
export class FiltroBuscadorPageModule {}
