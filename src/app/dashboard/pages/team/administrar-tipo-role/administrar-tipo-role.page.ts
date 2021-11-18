import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { listMembers } from 'src/app/dashboard/interfaces/team.interface';
import { EquipoService } from '../../../services/equipo.service';

@Component({
  selector: 'app-administrar-tipo-role',
  templateUrl: './administrar-tipo-role.page.html',
  styleUrls: ['./administrar-tipo-role.page.scss'],
})
export class AdministrarTipoRolePage implements OnInit {

  @Input() listMembers: listMembers;
  @Input() typeRole: number;

  constructor(private modalController: ModalController, private equipoService: EquipoService) { }

  ngOnInit() {
  }

  async closeModalManageTeam() {
    await this.modalController.dismiss();
  }

  onDeleteMemberTeam(idTeam: number, idUser: number) {
    this.equipoService.getDeleteMemberTeam(idTeam, idUser).subscribe(resp => console.log(resp));
  }

  onUpdateRoleMemberTeam(idTeam: number, idUser: number) {
    this.equipoService.getUpdateRoleMemberTeam(idTeam, idUser).subscribe(resp => console.log(resp));
  }

}
