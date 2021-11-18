import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeamUsers } from 'src/app/dashboard/interfaces/team.interface';

@Component({
  selector: 'app-list-team-members',
  templateUrl: './list-team-members.component.html',
  styleUrls: ['./list-team-members.component.scss'],
})
export class ListTeamMembersComponent implements OnInit {

  @Input() teamUsers: TeamUsers[] = [];
  @Input() errorHandle: any | null = null;
  @Output() showGetModalManageTeam = new EventEmitter<{ IdEquipo: number, typeInvitation: string}>();

  constructor() { }

  ngOnInit() { }

  getModalManageTeam(IdEquipo: number, typeInvitation: string) {
    this.showGetModalManageTeam.emit({ IdEquipo, typeInvitation });
  }

}
