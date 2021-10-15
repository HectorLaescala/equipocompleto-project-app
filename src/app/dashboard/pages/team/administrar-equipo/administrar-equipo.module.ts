import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

import { AdministrarEquipoPageRoutingModule } from './administrar-equipo-routing.module';

import { AdministrarEquipoPage } from './administrar-equipo.page';
import { ListDeportsFavoritesComponent } from '../components/administrar-equipo/list-deports-favorites/list-deports-favorites.component';
import { ModalWithOptionsPageModule } from '../../../../shared/pages/modals/modal-with-options/modal-with-options.module';
import { ModalOptionAceptedPageModule } from '../../../../shared/pages/modals/modal-option-acepted/modal-option-acepted.module';
import { ListMembersTeamComponent } from '../components/administrar-equipo/list-members-team/list-members-team.component';

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
    NgxIonicImageViewerModule
  ],
  declarations: [AdministrarEquipoPage, ListDeportsFavoritesComponent, ListMembersTeamComponent]
})
export class AdministrarEquipoPageModule {}
