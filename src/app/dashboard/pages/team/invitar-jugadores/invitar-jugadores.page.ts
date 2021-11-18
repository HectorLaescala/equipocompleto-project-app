import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalsService } from '../../../../services/modals.service';
import { AlertsService } from '../../../../services/alerts.service';
import { Subject, throwError } from 'rxjs';
import { map, tap, filter, distinctUntilChanged, takeUntil, switchMap, catchError } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { InvitationService } from '../../../services/invitation.service';

@Component({
  selector: 'app-invitar-jugadores',
  templateUrl: './invitar-jugadores.page.html',
  styleUrls: ['./invitar-jugadores.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvitarJugadoresPage implements OnInit, OnDestroy {
  idTeam: number = 0;
  @ViewChild(IonSearchbar, { static: true }) searchbar: IonSearchbar;
  private destroy$ = new Subject<unknown>();
  errorHandle$ = new Subject<boolean>();
  playerTeams$ = this.invitationService.playerTeams$;
  searchFormControl = new FormControl('');
  searching: boolean = false;
  searchLength: boolean = false;
  errorHandleScroll$ = new Subject<boolean>();
  errorHandleSearch$ = new Subject<boolean>();
  statusHandleSearch: boolean = false;
  dataParams: object;
  constructor(
    private invitationService: InvitationService,
    private modals: ModalsService,
    private alertsService: AlertsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.onSearch();
    this.route.queryParams.subscribe(() => {
      if (router.getCurrentNavigation().extras.state) {
        this.dataParams = this.router.getCurrentNavigation().extras.state.params;
        this.idTeam = this.dataParams['id'];
      }
    })
  }

  ngOnDestroy(): void {
    this.invitationService.playerTeamsSubject.next(null);
    this.errorHandle$.next(null);
    this.errorHandleScroll$.next(null);
    this.errorHandleSearch$.next(null);
    this.destroy$.next({});
    this.destroy$.complete();
  }


  ngOnInit(): void {
    this.getPlayers();
    this.searchbar.setFocus();
  }


  private onSearch(): void {

    this.searchFormControl.valueChanges.pipe(
      map(search => {
        this.statusHandleSearch = false;
        this.errorHandleSearch$.next(null);
        this.errorHandleScroll$.next(null);
        this.errorHandle$.next(null);
        return search?.toLowerCase().trim();

      }),
      distinctUntilChanged(),
      filter((search) => {
        if (search !== '' && search?.length > 2) {
          return true;
        } else if (search?.length > 0 && search?.length <= 2) {
          this.statusHandleSearch = true;
          return false;
        } else if (search === '') {
          this.searching = true;
          this.statusHandleSearch = false;
          this.getPlayers();
          return false;
        }
      }),
      tap(() => this.searching = true),
      switchMap((search) => this.invitationService.getSearchPlayerTeam(search, this.idTeam)),
      tap(() => this.searching = false),
      tap((players) => {
        if (players.length === 0) {
          this.statusHandleSearch = true;
        }
      }),
      catchError((err) => {
        this.searching = false;
        this.statusHandleSearch = false;
        this.errorHandleSearch$.next(true);
        return throwError(err);
      }),
      takeUntil(this.destroy$)).subscribe();
  }

  ionClear() {
    this.errorHandleSearch$.next(null);
    this.errorHandleScroll$.next(null);
    this.errorHandle$.next(null);
  }

  onClose() {
    let navigationExtras: NavigationExtras = {
      state: {
        params: this.dataParams
      }
    }

    this.router.navigate(['/dashboard/team/profile-team'], navigationExtras);
  }


  getPlayers() {
    this.invitationService.getListPlayerTeam(this.idTeam).pipe(
      tap(() => this.searching = false),
      catchError((err) => {
        this.searching = false;
        this.errorHandleSearch$.next(null);
        this.errorHandleScroll$.next(null);
        this.errorHandle$.next(true);
        return throwError(err);
      })
    ).subscribe();
  }

  getPlayersScroll(event?) {
    this.invitationService.getListPlayerTeamScroll(this.idTeam).pipe(
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

  onSendInvitation(IdUsuario: number, option: string | null) {
    if (option === 'Pendiente') {
      return;
    }

    this.alertsService.present('Cargando...');

    const http$ = this.invitationService.getSendInvitationPlayer(
      IdUsuario,
      this.idTeam
    );

    http$.subscribe(
      async (resp) => {

        await this.alertsService.dismiss();

        if (resp == '0') {

          this.modals.getshowModalOption(
            'style-icon-success',
            '¡Felicidades!',
            '',
            'Invitación Enviada',
            ''
          );
          this.getPlayers();
        } else if (resp == '1') {
          this.modals.getshowModalOption(
            'style-icon-error',
            '¡Error!',
            '',
            'Ya existe una invitación por parte del equipo',
            ''
          );
        } else if (resp == '2') {
          this.modals.getshowModalOption(
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
