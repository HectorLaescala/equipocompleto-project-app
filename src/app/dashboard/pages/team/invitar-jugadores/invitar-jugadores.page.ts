import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { EquipoService } from '../../../services/equipo.service';
import { ActivatedRoute } from '@angular/router';
import { ModalsService } from '../../../../services/modals.service';
import { AlertsService } from '../../../../services/alerts.service';
import { Subject, throwError } from 'rxjs';
import { map, tap, filter, distinctUntilChanged, takeUntil, switchMap, catchError } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-invitar-jugadores',
  templateUrl: './invitar-jugadores.page.html',
  styleUrls: ['./invitar-jugadores.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvitarJugadoresPage implements OnDestroy {
  idTeam: number = 0;
  @ViewChild(IonSearchbar, { static: true }) searchbar: IonSearchbar;
  private destroy$ = new Subject<unknown>();
  errorHandle$ = new Subject<boolean>();
  playerTeams$ = this.equipoService.playerTeams$;
  searchFormControl = new FormControl('');
  searching: boolean = false;
  searchLength: boolean = false;
  errorHandleScroll$ = new Subject<boolean>();
  constructor(
    private equipoService: EquipoService,
    private activatedRoute: ActivatedRoute,
    private modals: ModalsService,
    private alertsService: AlertsService
  ) {
    this.onSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ionViewDidEnter() {
    this.activatedRoute.params.subscribe(({ id }) => this.idTeam = id);
    this.getPlayers();
    this.searchbar.setFocus();
  }


  private onSearch(): void {
    //this.searchLength = true;
    this.searchFormControl.valueChanges.pipe(
      map(search => search?.toLowerCase().trim()),
      distinctUntilChanged(),
      filter((search) => {
        if (search !== '' && search?.length > 2) {
          return true;
        } else if (search === '') {
          this.getPlayers();
          return false;
        }
      }),
      tap(() => this.searching = true),
      switchMap((search) => this.equipoService.getSearchPlayerTeam(search, this.idTeam)),
      tap(() => this.searching = false),
      catchError((err) => {
       //this.errorHandle$.next(true);
        return throwError(err);
      }),
      takeUntil(this.destroy$)).subscribe();
  }

  ionClear() {
  }

  getPlayers() {
    this.equipoService.getListPlayerTeam(this.idTeam).pipe(
      catchError((err) => {
        this.errorHandle$.next(true);
        return throwError(err);
      })
    ).subscribe();
  }

  getPlayersScroll(event?) {
    this.equipoService.getListPlayerTeamScroll(this.idTeam).pipe(
      tap(([resp]) => {

        event.target.complete();

        if (resp?.length === 0) {
          event.target.disabled = true;
        }
      }),
      catchError((err) => {
        event.target.complete();
        event.target.disabled = true;
        this.errorHandleScroll$.next(true);
        return throwError(err);
      })
    ).subscribe();
  }

  async onSendInvitation(IdUsuario: number, option: string | null) {
    if (option === 'Pendiente') {
      return;
    }

    await this.alertsService.present('Cargando...');

    const http$ = await this.equipoService.getSendInvitationPlayer(
      IdUsuario,
      this.idTeam
    );

    http$.subscribe(
      async (resp) => {

        await this.alertsService.dismiss();

        if (resp == '0') {

          await this.modals.getshowModalOption(
            'style-icon-success',
            '¡Felicidades!',
            '',
            'Invitación Enviada',
            ''
          );
          this.getPlayers();
        }
        if (resp == '1') {
          await this.modals.getshowModalOption(
            'style-icon-error',
            '¡Error!',
            '',
            'Ya existe una invitación por parte del equipo',
            ''
          );
        } else if (resp == '2') {
          await this.modals.getshowModalOption(
            'style-icon-error',
            '¡Error!',
            '',
            'Ya pertenece al equipo',
            ''
          );
        }
      },
      (err) => {
        this.alertsService.dismiss();
        this.modals.getshowModalOption(
          'style-icon-error',
          '¡Ha ocurrido un error!',
          '',
          'Por favor intentalo mas tarde',
          ''
        );
      }
    );
  }
}
