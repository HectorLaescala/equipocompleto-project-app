import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';
import { detailTeam } from 'src/app/dashboard/interfaces/invitation.interface';
import { InvitationService } from '../../../services/invitation.service';
import { StorageService } from '../../../../services/storage.service';
import { ModalsService } from 'src/app/services/modals.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.page.html',
  styleUrls: ['./detalle-equipo.page.scss'],
})
export class DetalleEquipoPage implements OnInit, OnDestroy {

  idteam: number = 0;
  moreDeportsFavorites: boolean = false;
  detailsTeam$: Observable<detailTeam[]>;
  errorHandle$ = new Subject<boolean | null>();

  constructor(private alertsService: AlertsService, private storage: StorageService, private modals: ModalsService, private modalController: ModalController, private invitationService: InvitationService, private navParams: NavParams) { }

  ngOnInit(): void {
    this.idteam = this.navParams.data.idteam;
    this.getDetailTeam(this.idteam);
  }

  ngOnDestroy(): void {
    this.errorHandle$.next(null);
  }

  async closePresentModalSimple() {
    await this.modalController.dismiss();
  }

  getDetailTeam(idteam: number) {
    this.detailsTeam$ = this.invitationService.getDetailTeam(idteam).pipe(
      catchError((err) => {
        this.errorHandle$.next(true);
        return throwError(err);
      }));
  }

  onMoreDeportsFavorites() {
    this.moreDeportsFavorites = true;
  }

  onSendInvitationTeam() {
    this.invitationService.getSendInvitationTeam(this.storage.userProfile.IdUsuario, this.idteam).pipe(
      startWith(this.alertsService.present('Cargando...'))
    ).subscribe(data => {
      this.alertsService.dismiss();
      if (data == '0') {
        this.modals.getshowModalOption(
          'style-icon-success',
          '¡Felicidades!',
          '',
          'Invitación Enviada',
          ''
        );
        this.modalController.dismiss(true);
      }
    }, (() => {
      this.alertsService.dismiss();
      this.modalController.dismiss(false);
      this.modals.getshowModalOption(
        'style-icon-error',
        '¡Ha ocurrido un error!',
        '',
        'Por favor intentalo mas tarde',
        ''
      );
    }))
  }

}


