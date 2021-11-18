import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

import { PerfilEquipoPageRoutingModule } from './perfil-equipo-routing.module';

import { PerfilEquipoPage } from './perfil-equipo.page';
import { TeamsModule } from '../components/teams.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxIonicImageViewerModule,
    PerfilEquipoPageRoutingModule,
    TeamsModule
  ],
  declarations: [PerfilEquipoPage]
})
export class PerfilEquipoPageModule {}
