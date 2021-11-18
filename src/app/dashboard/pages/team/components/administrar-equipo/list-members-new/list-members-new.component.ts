import { Component, Input, OnInit } from '@angular/core';
import { listInvitationNewPlayers } from 'src/app/dashboard/interfaces/invitation.interface';

@Component({
  selector: 'app-list-members-new',
  templateUrl: './list-members-new.component.html',
  styleUrls: ['./list-members-new.component.scss'],
})
export class ListMembersNewComponent implements OnInit {

  @Input() listMembersNewPlayers: listInvitationNewPlayers[] = [];
  @Input() errorHandle: any = null;
  @Input() errorHandleScroll: any = null;

  constructor() { }

  ngOnInit() { }

}
