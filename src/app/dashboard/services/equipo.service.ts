import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { ageAverage, Deport, GendersTeam, listDeportsFavorite, listMembers, ListPlayer, TeamsUserProfile, TeamUsers, TypeTeam } from '../interfaces/team.interface';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
import { AlertsService } from 'src/app/services/alerts.service';
import { ModalsService } from 'src/app/services/modals.service';
import { catchError, take, tap, withLatestFrom } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private url = environment.urlApi;
  private playerTeamsSubject = new BehaviorSubject<ListPlayer[]>(null);
  playerTeams$ = this.playerTeamsSubject.asObservable();



  pageDeportsFavorite: number = 0;
  pageSearchPlayer: number = 0;

  constructor(
    private http: HttpClient,
    private fileTransfer: FileTransfer,
    private storage: StorageService,
    private alertsService: AlertsService,
    private modals: ModalsService) { }

  getGender() {
    return this.http.get<GendersTeam[]>(`/api/GeneroEquipo`);
  }

  getAgeAverage() {
    return this.http.get<ageAverage[]>(`/api/dataedadpromedio`);
  }

  getDeports() {
    return this.http.get<Deport[]>(`/api/deporteequipo`);
  }

  getDeportsFavoritesTeam(id: number) {
    const params = new HttpParams()
      .set("IdEquipo", `${id}`)
    return this.http.get<Deport[]>(`/api/DeportesFavEquipo`, { params });
  }

  getTypeTeam() {
    return this.http.get<TypeTeam[]>(`/api/TipoEquipo`);
  }

  getMembersTeam(id: number): Observable<listMembers[]> {
    const params = new HttpParams()
      .set("IdEquipo", `${id}`)

    return this.http.get<listMembers[]>(`/api/equiposusuarios`, { params });
  }

  getProfileTeamImage(id: number) {
    const params = new HttpParams()
      .set("IdEquipo", `${id}`)

    return this.http.get(`/api/CargaImagenEquipo`, { params });
  }

  getRegisterTeam(data: object) {

    const params = new HttpParams()
      .set("IdUsuarioCreador", data['IdUsuarioCreador'])
      .set("IdTipoUsuario", data['IdTipoUsuario'])
      .set("NombreEquipo", data['NombreEquipo'])
      .set("IdGenero", data['IdGenero'])
      .set("Descripcion", data['Descripcion'])
      .set("IdTipoEquipo", data['IdTipoEquipo'])
      .set("IdEdadPromedio", data['IdEdadPromedio'])
      .set("IdDeporte", data['IdDeporte']);

    return new Promise(resolve => {

      this.http.post(`/api/Equipo`, params).subscribe(resp => {
        if (resp === "1") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  getUpdateTeamProfile(data: object) {
    const params = new HttpParams()
      .set("IdEquipo", data['IdEquipo'])
      .set("IdUsuarioCreador", data['IdUsuarioCreador'])
      .set("IdTipoUsuario", data['IdTipoUsuario'])
      .set("NombreEquipo", data['NombreEquipo'])
      .set("Descripcion", data['Descripcion'])
      .set("IdGeneroEquipo", data['IdGeneroEquipo'])
      .set("IdTipoEquipo", data['IdTipoEquipo'])
      .set("IdEdadPromedio", data['IdEdadPromedio']);

    return new Promise(resolve => {

      this.http.put(`/api/PerfilEquipo`, params).subscribe(resp => {
        if (resp === "1") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  getTeamsUser(idUsuario: number): Observable<TeamUsers[]> {

    const params = new HttpParams()
      .set("IdUsuario", `${idUsuario}`)

    return this.http.post<TeamUsers[]>(`/api/equiposusuarios`, params);

  }

  getTeamsUserProfile(idtTeam: number): Observable<TeamsUserProfile> {

    const params = new HttpParams()
      .set("IdEquipo", `${idtTeam}`)

    return this.http.post<TeamsUserProfile>(`/api/perfilequipo`, params);
  }


  getUploadFileTeamImage(img: string, id: number) {

    const options: FileUploadOptions = {
      fileKey: 'UploadedImage',
      headers: {
        'Authorization': `Bearer ${this.storage.userProfile.Token}`
      }
    };

    this.alertsService.present('Cargando...');

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img, `${this.url}/api/CargaImagenEquipo?IdEquipo=${id}`, options).then(data => {
      this.alertsService.dismiss();
    }).catch(err => {
      this.alertsService.dismiss();
      this.modals.getshowModalOption('style-icon-error', '¡Ha ocurrido un error!', '', 'Por favor intentalo mas tarde', '');
    });

  }

  getDeportsFavoriteTeam(id: number, pull: boolean = false): Observable<listDeportsFavorite> {

    if (pull) {
      this.pageDeportsFavorite = 0;
    }

    this.pageDeportsFavorite++;

    const params = new HttpParams()
      .set("IdEquipo", `${id}`)
      .set("Page", `${this.pageDeportsFavorite}`);

    return this.http.get<listDeportsFavorite>(`/api/Equipo`, { params });
  }

  getAddTeamDeport(data: object) {

    const params = new HttpParams()
      .set("IdEquipo", data['IdEquipo'])
      .set("IdDeporte", data['IdDeporte']);

    return new Promise(resolve => {

      this.http.post(`/api/DeporteEquipo`, params).subscribe(resp => {
        if (resp === "1") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  getRemoveTeamDeport(IdEquipo: number, IdDeporte: number) {
    const params = new HttpParams()
      .set("IdEquipo", `${IdEquipo}`)
      .set("IdDeporte", `${IdDeporte}`);

    return new Promise(resolve => {
      this.http.delete(`/api/DeporteEquipo`, { params }).subscribe(resp => {
        if (resp === "1") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }


  getListPlayerTeam(idTeam: number):Observable<ListPlayer[]>{

    this.pageSearchPlayer = 1;

    const params = new HttpParams()
      .set("IdEquipo", idTeam)
      .set("page", `${this.pageSearchPlayer}`);

    return this.http.get<ListPlayer[]>(`/api/Usuario`, { params }).pipe(
      take(1),
      tap(data => this.playerTeamsSubject.next(data)));
  }


  getListPlayerTeamScroll(idTeam: number) {

    this.pageSearchPlayer++;

    const params = new HttpParams()
      .set("IdEquipo", idTeam)
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


  getSearchPlayerTeam(namePlayer: string, idTeam: number):Observable<ListPlayer[]> {
    const params = new HttpParams()
      .set("Nombre", namePlayer)
      .set("IdEquipo", idTeam);

    return this.http.get<ListPlayer[]>(`/api/BuscaJugador`, { params }).pipe(
      tap((apiResponse) => {
        this.playerTeamsSubject.next([...apiResponse]);
      }),
      catchError((err: HttpErrorResponse) => {
        this.playerTeamsSubject.next(null);
        return throwError(err);
      })
    );
  }


  getActiveInvitationSwitch(idTeam: number, IdAceptaI: number) {

    const params = new HttpParams()
      .set("IdEquipo", idTeam)
      .set("IdAceptaI", IdAceptaI);

    return this.http.post(`/api/activainvitacion`, params);
  }

  getSendInvitationPlayer(IdUsuario: number, IdEquipo: number) {

    const params = new HttpParams()
      .set("IdUsuario", IdUsuario)
      .set("IdEquipo", IdEquipo);

    return this.http.post(`/api/invitacionusuario`, params);
  }

  getOutTeam(IdUsuario: number, IdEquipo: number) {
    const params = new HttpParams()
      .set("IdUsuario", `${IdUsuario}`)
      .set("IdEquipo", `${IdEquipo}`);

    return this.http.delete(`/api/Equipo`, { params });
  }
}
