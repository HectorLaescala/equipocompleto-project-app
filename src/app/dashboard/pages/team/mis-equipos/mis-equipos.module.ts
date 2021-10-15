import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisEquiposPageRoutingModule } from './mis-equipos-routing.module';

import { MisEquiposPage } from './mis-equipos.page';
import { ListTeamAdministratorComponent } from '../components/mis-equipos/list-team-administrator/list-team-administrator.component';
import { ListTeamMembersComponent } from '../components/mis-equipos/list-team-members/list-team-members.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MisEquiposPageRoutingModule
  ],
  declarations: [MisEquiposPage, ListTeamAdministratorComponent, ListTeamMembersComponent]
})
export class MisEquiposPageModule {}
