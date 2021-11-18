import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { listMembers } from 'src/app/dashboard/interfaces/team.interface';

@Component({
  selector: 'app-list-members-team',
  templateUrl: './list-members-team.component.html',
  styleUrls: ['./list-members-team.component.scss'],
})
export class ListMembersTeamComponent implements OnInit {

  @Input() listMembers: listMembers[] = [];
  @Input() validated: boolean = false;
  @Output() showModalEditAdministration = new EventEmitter<{ typeRole: number, listMember: listMembers }>();

  constructor() { }

  ngOnInit() { }

  getSelectRole(typeRole: number, listMember: listMembers) {
    if (typeRole == 2) {
      this.showModalEditAdministration.emit({ typeRole, listMember });
    }
  }


}
