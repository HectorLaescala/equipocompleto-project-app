import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TeamUsers } from 'src/app/dashboard/interfaces/team.interface';

@Component({
  selector: 'app-carousel-teams',
  templateUrl: './carousel-teams.component.html',
  styleUrls: ['./carousel-teams.component.scss'],
})
export class CarouselTeamsComponent implements OnInit {

  @Input() teamUsers: TeamUsers[] | null = null;
  @Input() errorHandle: any | null = null;
  @Output() showGetModalManageTeam = new EventEmitter<{ IdEquipo: number, CantidadMiembros: number,routerLink:string,nameTeam:string }>();
  
  constructor() { }

  ngOnInit() { }

  slideOpts = {
    spaceBetween: -7,
    slidesPerView: 2,
    resistanceRatio: 0
  };

  getModalManageTeam(IdEquipo: number, CantidadMiembros: number,routerLink:string,nameTeam:string) {
    this.showGetModalManageTeam.emit({ IdEquipo, CantidadMiembros,routerLink,nameTeam });
  }

}
