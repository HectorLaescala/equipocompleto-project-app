import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ListDeportsFavoritesComponent } from './administrar-equipo/list-deports-favorites/list-deports-favorites.component';
import { ListMembersTeamComponent } from './administrar-equipo/list-members-team/list-members-team.component';
import { ListTeamAdministratorComponent } from './mis-equipos/list-team-administrator/list-team-administrator.component';
import { ListTeamMembersComponent } from './mis-equipos/list-team-members/list-team-members.component';
import { SkeletonDetalleEquipoComponent } from './detalle-equipo/skeleton-detalle-equipo/skeleton-detalle-equipo.component';
import { ListMembersNewComponent } from './administrar-equipo/list-members-new/list-members-new.component';



@NgModule({
  declarations: [ListDeportsFavoritesComponent, ListMembersTeamComponent, ListTeamAdministratorComponent, ListTeamMembersComponent, ListMembersNewComponent,SkeletonDetalleEquipoComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    ListDeportsFavoritesComponent,
    ListMembersTeamComponent,
    ListTeamAdministratorComponent,
    ListTeamMembersComponent,
    ListMembersNewComponent,
    SkeletonDetalleEquipoComponent
  ]
})
export class TeamsModule { }
