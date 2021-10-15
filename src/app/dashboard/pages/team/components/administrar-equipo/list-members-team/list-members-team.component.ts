import { Component, Input, OnInit } from '@angular/core';
import { listMembers } from 'src/app/dashboard/interfaces/team.interface';

@Component({
  selector: 'app-list-members-team',
  templateUrl: './list-members-team.component.html',
  styleUrls: ['./list-members-team.component.scss'],
})
export class ListMembersTeamComponent implements OnInit {

  @Input() listMembers: listMembers[] = [];

  constructor() { }

  ngOnInit() { }

}
