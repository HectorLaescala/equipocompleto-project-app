import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { CrearEquipoPageRoutingModule } from './crear-equipo-routing.module';

import { CrearEquipoPage } from './crear-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    CrearEquipoPageRoutingModule
  ],
  declarations: [CrearEquipoPage]
})
export class CrearEquipoPageModule { }
