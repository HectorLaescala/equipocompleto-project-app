import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisEquiposPageRoutingModule } from './mis-equipos-routing.module';

import { MisEquiposPage } from './mis-equipos.page';
import { TeamsModule } from '../components/teams.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MisEquiposPageRoutingModule,
    TeamsModule
  ],
  declarations: [MisEquiposPage]
})
export class MisEquiposPageModule {}
