import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeamUsers } from 'src/app/dashboard/interfaces/team.interface';

@Component({
  selector: 'app-list-team-administrator',
  templateUrl: './list-team-administrator.component.html',
  styleUrls: ['./list-team-administrator.component.scss'],
})
export class ListTeamAdministratorComponent implements OnInit {

  @Input() teamUsers: TeamUsers[] | null = null;
  @Input() errorHandle: any | null = null;
  @Output() showGetModalManageTeam = new EventEmitter<{ IdEquipo: number, CantidadMiembros: number,routerLink:string, nameTeam:string}>();

  constructor() {
  }

  ngOnInit() { }

  getModalManageTeam(IdEquipo: number, CantidadMiembros: number,routerLink:string,nameTeam:string) {
    this.showGetModalManageTeam.emit({ IdEquipo, CantidadMiembros, routerLink,nameTeam });
  }
}
