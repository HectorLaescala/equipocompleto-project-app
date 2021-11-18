import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { Observable } from 'rxjs';
import { ageAverage, Deport, GendersTeam, listDeportsFavorite, listMembers, TeamsUserProfile, TeamUsers, TypeTeam } from '../interfaces/team.interface';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
import { AlertsService } from 'src/app/services/alerts.service';
import { ModalsService } from 'src/app/services/modals.service';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private url = environment.urlApi;

  pageDeportsFavorite: number = 0;


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


  getActiveInvitationSwitch(idTeam: number, IdAceptaI: number) {

    const params = new HttpParams()
      .set("IdEquipo", idTeam)
      .set("IdAceptaI", IdAceptaI);

    return this.http.post(`/api/activainvitacion`, params);
  }


  getOutTeam(IdUsuario: number, IdEquipo: number) {
    const params = new HttpParams()
      .set("IdUsuario", `${IdUsuario}`)
      .set("IdEquipo", `${IdEquipo}`);

    return this.http.delete(`/api/Equipo`, { params });
  }

  getDeleteMemberTeam(IdEquipo: number, IdUsuario: number) {
    const params = new HttpParams()
      .set("IdEquipo", `${IdEquipo}`)
      .set("IdUsuario", `${IdUsuario}`);

    return this.http.delete(`/api/eliminausequipo`, { params });
  }

  getUpdateRoleMemberTeam(IdEquipo: number, IdUsuario: number) {
    const params = new HttpParams()
      .set("IdEquipo", `${IdEquipo}`)
      .set("IdUsuario", `${IdUsuario}`)
      .set("IdRolJugador", 1);

    return this.http.put(`/api/RolJugador`,  params );
  }
}
