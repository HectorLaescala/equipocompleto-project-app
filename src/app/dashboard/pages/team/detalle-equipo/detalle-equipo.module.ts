import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleEquipoPageRoutingModule } from './detalle-equipo-routing.module';

import { DetalleEquipoPage } from './detalle-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleEquipoPageRoutingModule
  ],
  declarations: [DetalleEquipoPage]
})
export class DetalleEquipoPageModule {}
