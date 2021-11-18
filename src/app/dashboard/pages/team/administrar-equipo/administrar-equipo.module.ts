import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

import { AdministrarEquipoPageRoutingModule } from './administrar-equipo-routing.module';

import { AdministrarEquipoPage } from './administrar-equipo.page';
import { ModalWithOptionsPageModule } from '../../../../shared/pages/modals/modal-with-options/modal-with-options.module';
import { ModalOptionAceptedPageModule } from '../../../../shared/pages/modals/modal-option-acepted/modal-option-acepted.module';
import { TeamsModule } from '../components/teams.module';
import { AdministrarTipoRolePage } from '../administrar-tipo-role/administrar-tipo-role.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonicSelectableModule,
    AdministrarEquipoPageRoutingModule,
    ModalWithOptionsPageModule,
    ModalOptionAceptedPageModule,
    NgxIonicImageViewerModule,
    TeamsModule
  ],
  declarations: [AdministrarEquipoPage, AdministrarTipoRolePage],
  entryComponents: [
    AdministrarTipoRolePage
  ]
})
export class AdministrarEquipoPageModule {}
