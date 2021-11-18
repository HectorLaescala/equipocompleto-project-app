import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, delay, take, tap, withLatestFrom } from 'rxjs/operators';
import { carouselInvitationPlayers, CarouselInvitationTeams, detailTeam, ListPlayer, ListTeams, listInvitationNewPlayers } from '../interfaces/invitation.interface';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  playerTeamsSubject = new BehaviorSubject<ListPlayer[]>(null);
  private carouselInvitationPlayersSubject = new BehaviorSubject<carouselInvitationPlayers[]>(null);
  private carouselInvitationTeamsSubject = new BehaviorSubject<CarouselInvitationTeams[]>(null);
  private listInvitationPlayersSubject = new BehaviorSubject<listInvitationNewPlayers[]>(null);
  listTeamsSubject = new BehaviorSubject<ListTeams[]>(null);
  private pageCarouselPlayers: number = 0;
  private pageCarouselTeams: number = 0;
  private pageListPlayers: number = 0;
  private pageSearchPlayer: number = 0;
  private pageSearchTeam: number = 0;
  carouselInvitationPlayers$ = this.carouselInvitationPlayersSubject.asObservable();
  carouselInvitationTeams$ = this.carouselInvitationTeamsSubject.asObservable();
  playerTeams$ = this.playerTeamsSubject.asObservable();
  listTeams$ = this.listTeamsSubject.asObservable();
  listInvitationPlayers$ = this.listInvitationPlayersSubject.asObservable();


  constructor(private http: HttpClient) { }

  getSearchPlayerTeam(namePlayer: string, idTeam: number): Observable<ListPlayer[]> {
    const params = new HttpParams()
      .set("Nombre", namePlayer)
      .set("IdEquipo", idTeam);

    return this.http.get<ListPlayer[]>(`/api/BuscaJugador`, { params }).pipe(
      tap((apiResponse) => {
        this.playerTeamsSubject.next([...apiResponse]);
      }),
      catchError((err: HttpErrorResponse) => {
        this.playerTeamsSubject.next([]);
        return throwError(err);
      })
    );
  }

  getSearchTeam(namePlayer: string, filter: string): Observable<ListTeams[]> {
    const params = new HttpParams()
      .set("Nombre", namePlayer)
      .set("IdFiltro", `${filter}`);

    return this.http.get<ListTeams[]>(`/api/buscaequipo`, { params }).pipe(
      tap((apiResponse) => {
        this.listTeamsSubject.next([...apiResponse]);
      }),
      catchError((err: HttpErrorResponse) => {
        this.listTeamsSubject.next([]);
        return throwError(err);
      })
    );
  }

  getListTeams(IdFiltro: string): Observable<ListTeams[]> {

    this.pageSearchTeam = 1;

    const params = new HttpParams()
      .set("IdFiltro", IdFiltro)
      .set("NRegistros", 20)
      .set("page", `${this.pageSearchTeam}`);

    return this.http.get<ListTeams[]>(`/api/listaequipos`, { params }).pipe(
      take(1),
      tap(data => this.listTeamsSubject.next(data)));
  }

  getListTeamsScroll(IdFiltro: string) {

    this.pageSearchTeam++;

    const params = new HttpParams()
      .set("IdFiltro", IdFiltro)
      .set("NRegistros", 20)
      .set("page", `${this.pageSearchTeam}`);

    return this.http.get<ListTeams[]>(`/api/listaequipos`, { params }).
      pipe(
        take(1),
        withLatestFrom(this.listTeams$),
        tap(([apiResponse, listTeams]) => {

          if (apiResponse.length === 0) {
            this.listTeamsSubject.next([...listTeams]);
          }

          const data = [...listTeams, ...apiResponse];
          this.listTeamsSubject.next(data);

        }));
  }

  getListPlayerTeam(idTeam: number): Observable<ListPlayer[]> {

    this.pageSearchPlayer = 1;

    const params = new HttpParams()
      .set("IdEquipo", idTeam)
      .set("NRegistros", 20)
      .set("page", `${this.pageSearchPlayer}`);

    return this.http.get<ListPlayer[]>(`/api/Usuario`, { params }).pipe(
      take(1),
      tap(data => this.playerTeamsSubject.next(data)));
  }

  getListPlayerTeamScroll(idTeam: number) {

    this.pageSearchPlayer++;

    const params = new HttpParams()
      .set("IdEquipo", idTeam)
      .set("NRegistros", 20)
      .set("page", `${this.pageSearchPlayer}`);

    return this.http.get<ListPlayer[]>(`/api/Usuario`, { params }).
      pipe(
        take(1),
        withLatestFrom(this.playerTeams$),
        tap(([apiResponse, playerTeams]) => {

          if (apiResponse.length === 0) {
            this.playerTeamsSubject.next([...playerTeams]);
          }

          const data = [...playerTeams, ...apiResponse];
          this.playerTeamsSubject.next(data);

        }));
  }

  getSendInvitationPlayer(IdUsuario: number, IdEquipo: number) {

    const params = new HttpParams()
      .set("IdUsuario", IdUsuario)
      .set("IdEquipo", IdEquipo);

    return this.http.post(`/api/invitacionusuario`, params);
  }


  getSendInvitationTeam(IdUsuario: number, IdEquipo: number) {

    const params = new HttpParams()
      .set("IdUsuario", IdUsuario)
      .set("IdEquipo", IdEquipo);

    return this.http.post(`/api/invitacionequipo`, params);
  }

  getCarouselInvitationPlayers(idUser: number) {

    this.pageCarouselPlayers = 1;

    const params = new HttpParams()
      .set("IdUsuario", idUser)
      .set("NRegistros", 20)
      .set("page", `${this.pageCarouselPlayers}`);

    return this.http.get<carouselInvitationPlayers[]>(`/api/invitacionusuarioenviadas`, { params }).pipe(
      take(1),
      tap(data => this.carouselInvitationPlayersSubject.next(data)));
  }

  getCarouselInvitationPlayersScroll(idUser: number) {

    this.pageCarouselPlayers++;

    const params = new HttpParams()
      .set("IdUsuario", idUser)
      .set("NRegistros", 20)
      .set("page", `${this.pageCarouselPlayers}`);

    return this.http.get<carouselInvitationPlayers[]>(`/api/invitacionusuarioenviadas`, { params }).
      pipe(
        take(1),
        withLatestFrom(this.carouselInvitationPlayers$),
        tap(([apiResponse, playerTeams]) => {

          if (apiResponse.length === 0) {
            this.carouselInvitationPlayersSubject.next([...playerTeams]);
          }

          const data = [...playerTeams, ...apiResponse];
          this.carouselInvitationPlayersSubject.next(data);

        }));
  }


  getDetailTeam(idTeam: number): Observable<detailTeam[]> {
    const params = new HttpParams()
      .set("IdEquipo", idTeam);

    return this.http.get<detailTeam[]>(`/api/DetalleEquipo`, { params });
  }

  getCarouselInvitationTeams(): Observable<CarouselInvitationTeams[]> {

    this.pageCarouselTeams = 1;

    const params = new HttpParams()
      .set("NRegistros", 20)
      .set("page", this.pageCarouselTeams);

    return this.http.get<CarouselInvitationTeams[]>(`/api/invitacionequipo`, { params }).pipe(
      take(1),
      tap(data => this.carouselInvitationTeamsSubject.next([...data])));
  }

  getCarouselInvitationTeamsScroll() {

    this.pageCarouselTeams++;

    const params = new HttpParams()
      .set("NRegistros", 20)
      .set("page", `${this.pageCarouselTeams}`);

    return this.http.get<CarouselInvitationTeams[]>(`/api/invitacionequipo`, { params }).
      pipe(
        take(1),
        withLatestFrom(this.carouselInvitationTeams$),
        tap(([apiResponse, listTeams]) => {

          if (apiResponse.length === 0) {
            this.carouselInvitationTeamsSubject.next([...listTeams]);
          }

          const data = [...listTeams, ...apiResponse];
          this.carouselInvitationTeamsSubject.next(data);

        }));
  }

  getInvitationStatusUser(IdinvitacionUsuario: number, idStatusInvitacion: number): Observable<string> {
    const params = new HttpParams()
      .set("IdinvitacionUsuario", IdinvitacionUsuario)
      .set("idStatusInvitacion", idStatusInvitacion);

    return this.http.post<string>(`/api/aceptainvitacionusuario`, params);
  }

  getInvitationStatusTeam(IdinvitacionEquipo: number, idStatusInvitacionEquipo: number): Observable<string> {
    const params = new HttpParams()
      .set("IdinvitacionEquipo", IdinvitacionEquipo)
      .set("idStatusInvitacionEquipo", idStatusInvitacionEquipo);

    return this.http.post<string>(`/api/cancelainvitacionequipo`, params);
  }


  getListInvitationNewPlayers(idTeam:number): Observable<listInvitationNewPlayers[]> {

    this.pageListPlayers = 1;

    const params = new HttpParams()
      .set("NRegistros", 20)
      .set("IdEquipo",idTeam)
      .set("page", `${this.pageListPlayers}`);

    return this.http.get<listInvitationNewPlayers[]>(`/api/invitacionusuario`, { params }).pipe(
      take(1),
      tap(data => this.listInvitationPlayersSubject.next(data)));
  }


  getListInvitationNewPlayersScroll(idTeam:number) {

    this.pageListPlayers++;

    const params = new HttpParams()
      .set("NRegistros", 20)
      .set("IdEquipo",idTeam)
      .set("page", `${this.pageListPlayers}`);

    return this.http.get<listInvitationNewPlayers[]>(`/api/invitacionusuario`, { params }).
      pipe(
        take(1),
        withLatestFrom(this.listInvitationPlayers$),
        tap(([apiResponse, listTeams]) => {

          if (apiResponse.length === 0) {
            this.listInvitationPlayersSubject.next([...listTeams]);
          }

          const data = [...listTeams, ...apiResponse];
          this.listInvitationPlayersSubject.next(data);

        }));
  }

}
