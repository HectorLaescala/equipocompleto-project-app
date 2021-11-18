import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ModalController, IonSearchbar } from '@ionic/angular';
import { FiltroBuscadorPage } from '../filtro-buscador/filtro-buscador.page';
import { InvitationService } from '../../../services/invitation.service';
import { Subject, throwError } from 'rxjs';
import { FormControl } from '@angular/forms';
import { catchError, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DetalleEquipoPage } from '../detalle-equipo/detalle-equipo.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador-equipos',
  templateUrl: './buscador-equipos.page.html',
  styleUrls: ['./buscador-equipos.page.scss'],
})
export class BuscadorEquiposPage implements OnDestroy {
  dataReturned: string = '';
  @ViewChild(IonSearchbar, { static: true }) searchbar: IonSearchbar;
  listTeams$ = this.invitationService.listTeams$;
  searchFormControl = new FormControl('');
  private destroy$ = new Subject<unknown>();
  errorHandle$ = new Subject<boolean>();
  searching: boolean = false;
  searchLength: boolean = false;
  errorHandleScroll$ = new Subject<boolean>();
  errorHandleSearch$ = new Subject<boolean>();
  statusHandleSearch: boolean = false;

  constructor(private router: Router, public keyboard: Keyboard, public modalController: ModalController, private invitationService: InvitationService) {
    this.onSearch();
  }

  navigateBackToPage() {
    this.router.navigateByUrl('/dashboard/profile', { replaceUrl: true });
  }

  ngOnInit(): void {
    this.dataReturned = '0';
    this.getListTeams();
    this.searchbar.setFocus();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
    this.invitationService.listTeamsSubject.next(null);
    this.errorHandleSearch$.next(null);
    this.errorHandleScroll$.next(null);
    this.errorHandle$.next(null);
    this.searchbar.value = '';
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
          this.getListTeams();
          return false;
        }
      }),
      tap(() => this.searching = true),
      switchMap((search) => this.invitationService.getSearchTeam(search, this.dataReturned)),
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

  async presentModalFilter() {
    const modal = await this.modalController.create({
      component: FiltroBuscadorPage,
      backdropDismiss: false,
      cssClass: 'custom-modal-team-all',
      componentProps: {
        "radioSelected": this.dataReturned
      },

    });

    modal.onDidDismiss().then(({ data }) => {
      if (data !== null) {
        this.dataReturned = data;
        this.invitationService.listTeamsSubject.next(null);
        this.statusHandleSearch = false;
        this.getListTeams();
      }

    });

    return await modal.present();
  }

  async presentModalDetailTeam(idteam: number) {
    const modal = await this.modalController.create({
      component: DetalleEquipoPage,
      cssClass: 'custom-modal-team-all',
      componentProps: {
        "idteam": idteam
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned?.data === true) {
        this.invitationService.listTeamsSubject.next(null);
        this.getListTeams();
      }
    });


    return await modal.present();
  }

  ionClear() {
    this.errorHandleSearch$.next(null);
    this.errorHandleScroll$.next(null);
    this.errorHandle$.next(null);
  }

  getListTeams() {
    this.invitationService.getListTeams(this.dataReturned).pipe(
      tap(() => this.searching = false),
      tap((players) => {
        if (players.length === 0) {
          this.statusHandleSearch = true;
        }
      }),
      catchError((err) => {
        this.searching = false;
        this.errorHandleSearch$.next(null);
        this.errorHandleScroll$.next(null);
        this.errorHandle$.next(true);
        return throwError(err);
      })
    ).subscribe();
  }

  getTeamsScroll(event?) {
    this.invitationService.getListTeamsScroll(this.dataReturned).pipe(
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
}

