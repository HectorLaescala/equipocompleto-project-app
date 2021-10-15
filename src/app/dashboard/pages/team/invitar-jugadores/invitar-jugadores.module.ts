import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InvitarJugadoresPageRoutingModule } from './invitar-jugadores-routing.module';

import { InvitarJugadoresPage } from './invitar-jugadores.page';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InvitarJugadoresPageRoutingModule,
    PipesModule
  ],
  declarations: [InvitarJugadoresPage]
})
export class InvitarJugadoresPageModule {}
