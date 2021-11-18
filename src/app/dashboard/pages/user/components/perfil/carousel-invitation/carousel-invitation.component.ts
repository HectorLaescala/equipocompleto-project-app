import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { carouselInvitationPlayers } from 'src/app/dashboard/interfaces/invitation.interface';

@Component({
  selector: 'app-carousel-invitation',
  templateUrl: './carousel-invitation.component.html',
  styleUrls: ['./carousel-invitation.component.scss'],
})
export class CarouselInvitationComponent implements OnInit {

  @ViewChild('slides') ionSlides: IonSlides;
  @Input() invitationPlayers: carouselInvitationPlayers[] = [];
  @Input() errorHandle: any = null;
  @Input() errorHandleScroll: any = null;
  @Input() carouselLoading: any = null;
  @Output() slideTouchCarousel = new EventEmitter<boolean>();
  @Output() showPageInvitation = new EventEmitter<{ IdEquipo: number, typeInvitation: string, idInvitation:number}>();

  constructor() { }

  ngOnInit() { }

  slideOpts = {
    spaceBetween: -7,
    slidesPerView: 2,
    resistanceRatio: 0,
    slidesOffsetAfter: 70
  };

  ionSlideReachEnd() {
    const isEnd = this.ionSlides.isEnd();

    Promise.all([isEnd]).then((data) => {
      if (data) {
        this.slideTouchCarousel.emit(true);
      }
    });

  }

  onViewProfileTeam(IdEquipo: number, typeInvitation: string, idInvitation:number) {
    this.showPageInvitation.emit({ IdEquipo, typeInvitation, idInvitation });
  }
}
