import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { CarouselTeamsComponent } from '../../team/components/perfil/carousel-teams/carousel-teams.component';
import { CarouselInvitationComponent } from '../../team/components/perfil/carousel-invitation/carousel-invitation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NgxIonicImageViewerModule,
    PerfilPageRoutingModule
  ],
  declarations: [PerfilPage, CarouselTeamsComponent, CarouselInvitationComponent]
})
export class PerfilPageModule {}
