import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { carouselInvitationPlayers } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-carousel-invitation',
  templateUrl: './carousel-invitation.component.html',
  styleUrls: ['./carousel-invitation.component.scss'],
})
export class CarouselInvitationComponent implements OnInit {

  @ViewChild('slides') ionSlides: IonSlides;
  @Input() invitationPlayers: carouselInvitationPlayers[] = [];
  @Input() errorHandle: any | null = null;
  @Output() slideTouchCarousel = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  slideOpts = {
    spaceBetween: -7,
    slidesPerView: 2,
    resistanceRatio: 0
  };

  ionSlideTouchEnd() {
    const isEnd = this.ionSlides.isEnd();

    Promise.all([isEnd]).then((data) => {

      if (data) {
        this.slideTouchCarousel.emit(true);
      }
    });

  }

}
