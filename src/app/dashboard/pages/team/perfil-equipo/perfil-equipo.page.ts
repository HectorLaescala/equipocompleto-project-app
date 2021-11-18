import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationService } from '../../../services/invitation.service';
import { detailTeam } from '../../../interfaces/invitation.interface';
import { listMembers } from 'src/app/dashboard/interfaces/team.interface';
import { EquipoService } from '../../../services/equipo.service';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ModalWithOptionsPage } from 'src/app/shared/pages/modals/modal-with-options/modal-with-options.page';
import { AlertsService } from '../../../../services/alerts.service';
import { ModalsService } from '../../../../services/modals.service';

@Component({
  selector: 'app-perfil-equipo',
  templateUrl: './perfil-equipo.page.html',
  styleUrls: ['./perfil-equipo.page.scss'],
})
export class PerfilEquipoPage implements OnInit {
  type: string;
  dataParams: any;
  idTeam: number = 0;
  typeInvitation: string = '';
  idInvitation: number = 0;
  detailTeams$: Observable<detailTeam[]>;
  listMembers: listMembers[] = [];
  validated: boolean = false;
  errorHandle$ = new Subject<boolean>();

  constructor(
    private alertsService: AlertsService,
    private modalsService: ModalsService,
    private router: Router,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private equipoService: EquipoService,
    private invitationService: InvitationService) {

    this.route.queryParams.subscribe(() => {
      if (router.getCurrentNavigation().extras.state) {
        this.dataParams = this.router.getCurrentNavigation().extras.state.params;
        this.idTeam = this.dataParams.id;
        this.typeInvitation = this.dataParams.typeInvitation;
        this.idInvitation = this.dataParams.idInvitation;
      }
    });
  }

  ngOnInit() {
    this.type = 'members';
    this.validated = false;
    this.getDetailTeam();
    this.getMembersTeam();
  }

  async onCancelInvitationUser(nameTeam: string) {

    const modal = await this.modalController.create({
      component: ModalWithOptionsPage,
      animated: true,
      backdropDismiss: false,
      componentProps: {
        icon: 'alert-circle-outline',
        title: (this.typeInvitation !== 'send') ? '¿Seguro/a deseas ' : '¿Cancelar la solicitud para unirte ',
        titleSubtitle: (this.typeInvitation !== 'send') ? `rechazar la invitación para unirte al equipo ${nameTeam}?` : `al equipo ${nameTeam}?`,
        downTitle: '',
        downSubtitle: '',
        buttonCancel: 'No',
        buttonConfirm: 'Si',
      },
      cssClass: 'custom-modal-team-all',
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data.params) {

      this.alertsService.present('Cargando...');

      if (this.typeInvitation == 'send') {

        this.getInvitationCancelTeam(this.idInvitation, 4);
        return;
      }

      this.getInvitationCancelUser(this.idInvitation, 2, nameTeam);
    }


  }

  async onConfirmInvitationUser() {
    this.alertsService.present('Cargando...');
    this.getInvitationConfirmlTeam(this.idInvitation, 1);
  }

  getInvitationCancelUser(IdinvitacionUsuario: number, idStatusInvitacion: number, nameTeam?: string) {
    this.invitationService.getInvitationStatusUser(IdinvitacionUsuario, idStatusInvitacion).subscribe(invitation => {
      this.alertsService.dismiss();
      if (invitation == "1") {
        this.router.navigate([`dashboard/profile`], { replaceUrl: true });

      } else {
        this.modalsService.getshowModalOption('style-icon-error', '¡Ha ocurrido un error!', '', 'Por favor intentalo mas tarde', '');
      }
    }, () => {
      this.alertsService.dismiss();
      this.modalsService.getshowModalOption('style-icon-error', '¡Ha ocurrido un error!', '', 'Por favor intentalo mas tarde', '')
    });
  }

  getInvitationCancelTeam(IdinvitacionEquipo: number, idStatusInvitacionEquipo: number) {
    this.invitationService.getInvitationStatusTeam(IdinvitacionEquipo, idStatusInvitacionEquipo).subscribe(invitation => {
      this.alertsService.dismiss();
      if (invitation == "1") {
        this.router.navigate([`dashboard/profile`], { replaceUrl: true });
      } else {
        this.modalsService.getshowModalOption('style-icon-error', '¡Ha ocurrido un error!', '', 'Por favor intentalo mas tarde', '');
      }
    }, () => {
      this.alertsService.dismiss();
      this.modalsService.getshowModalOption('style-icon-error', '¡Ha ocurrido un error!', '', 'Por favor intentalo mas tarde', '')
    });
  }

  getInvitationConfirmlTeam(IdinvitacionEquipo: number, idStatusInvitacionEquipo: number) {
    this.invitationService.getInvitationStatusUser(IdinvitacionEquipo, idStatusInvitacionEquipo).subscribe(invitation => {
      this.alertsService.dismiss();
      if (invitation == "1") {
        this.modalsService.getshowModalOptionRouter('style-icon-success', `¡Felicidades!`, 'ya eres parte del equipo', 'Recuerda que puedes acceder a él desde tu menú principal', '', 'dashboard/profile');
      } else {
        this.modalsService.getshowModalOption('style-icon-error', '¡Ha ocurrido un error!', '', 'Por favor intentalo mas tarde', '');
      }
    }, () => {
      this.alertsService.dismiss();
      this.modalsService.getshowModalOption('style-icon-error', '¡Ha ocurrido un error!', '', 'Por favor intentalo mas tarde', '')
    });
  }

  getDetailTeam() {
    this.detailTeams$ = this.invitationService.getDetailTeam(this.idTeam).pipe(
      catchError((err) => {
        this.errorHandle$.next(true);
        return throwError(err);
      }));
  }

  getMembersTeam() {
    this.equipoService.getMembersTeam(this.idTeam).subscribe((members) => this.listMembers = members);
  }

  navigateBackToPage() {
    this.router.navigateByUrl('/dashboard/profile', { replaceUrl: true });
  }

}
