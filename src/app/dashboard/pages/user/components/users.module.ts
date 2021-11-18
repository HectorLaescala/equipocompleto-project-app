import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CarouselInvitationComponent } from './perfil/carousel-invitation/carousel-invitation.component';
import { CarouselInvitationSendComponent } from './perfil/carousel-invitation-send/carousel-invitation-send.component';
import { CarouselTeamsComponent } from './perfil/carousel-teams/carousel-teams.component';



@NgModule({
  declarations: [CarouselInvitationComponent,CarouselInvitationSendComponent,CarouselTeamsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    CarouselInvitationComponent,
    CarouselInvitationSendComponent,
    CarouselTeamsComponent
  ]
})
export class UsersModule { }
