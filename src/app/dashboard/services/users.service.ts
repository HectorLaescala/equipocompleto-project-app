import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { environment } from "src/environments/environment";

import { Deport, DeportsFavorite, Genders, Profile, Region } from '../../auth/interfaces/user.interface';

import { StorageService } from "src/app/services/storage.service";
import { AlertsService } from '../../services/alerts.service';
import { ModalsService } from "src/app/services/modals.service";
import { Observable} from "rxjs";


const url = environment.urlApi;

@Injectable({
  providedIn: "root",
})

export class UsersService {

  private pageDeportsFavorite: number = 0;
 

  constructor(
    private http: HttpClient,
    private fileTransfer: FileTransfer,
    private storage: StorageService,
    private alertsService: AlertsService,
    private modals: ModalsService
  ) { }

  getDataUser(id: number) {

    const params = new HttpParams()
      .set("IdUser", `${id}`);


    return this.http.post<Profile[]>(`/api/perfilusuario`, params);
  }

  getUploadFileImage(img: string, token: string) {

    const options: FileUploadOptions = {
      fileKey: 'UploadedImage',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    this.alertsService.present('Cargando...');

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img, `${url}/api/cargaimagen`, options).then(data => {
      this.alertsService.dismiss();
    }).catch(() => {
      this.alertsService.dismiss();
      this.modals.getshowModalOption('style-icon-error', '¡Ha ocurrido un error!', '', 'Por favor intentalo mas tarde', '');
    });

  }

  getProfileImage(id: number) {
    const params = new HttpParams()
      .set("IdUsuario", `${id}`)

    return this.http.get(`/api/cargaimagen`, { params });
  }

  getEditDataUser(data: object, username: string, typeUser: number, id: number) {

    const params = new HttpParams()
      .set("IdUsuario", data['IdUsuario'])
      .set("IdTipoUsuario", data['IdTipoUsuario'])
      .set("Email", data['Email'])
      .set("Telefono", data['Telefono'])
      .set("Contraseña", data['Contraseña'])
      .set("IdRegion", data['IdRegion'])
      .set("IdGenero", data['IdGenero'])
      .set("FechaNacimiento", data['FechaNacimiento'])
      .set("NombreUsuario", data['NombreUsuario']);

    return new Promise(resolve => {

      this.http.put(`/api/Usuario`, params).subscribe(resp => {
        if (resp === '1') {
          this.storage.setObject('user', {
            IdTipoUsuario: typeUser,
            IdUsuario: id,
            NombreUsuario: username,
            Token: this.storage.userProfile.Token
          });
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  getAddUserDeport(data: object) {

    const params = new HttpParams()
      .set("idUsuario", data['IdUsuario'])
      .set("idDeporte", data['IdDeporte']);

    return new Promise(resolve => {

      this.http.post(`/api/Deportes`, params).subscribe(resp => {
        if (resp === "1") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }


  getDeports() {
    return this.http.get<Deport[]>(`/api/Deportes`);
  }

  getGender() {
    return this.http.get<Genders[]>(`/api/genero`);
  }

  getRegion() {
    return this.http.get<Region[]>(`/api/Region?IdPais=40`);
  }


  getDeportsFavorite(id: number, pull: boolean = false): Observable<DeportsFavorite> {

    if (pull) {
      this.pageDeportsFavorite = 0;
    }

    this.pageDeportsFavorite++;

    const params = new HttpParams()
      .set("IdUsuario", `${id}`)
      .set("Page", `${this.pageDeportsFavorite}`);


    return this.http.get<DeportsFavorite>(`/api/DeportesUsuario`, { params });
  }

  getRemoveUserDeport(id: number, IdDeporte: number) {
    const params = new HttpParams()
      .set("IdUsuario", `${id}`)
      .set("IdDeporte", `${IdDeporte}`);


    return new Promise(resolve => {
      this.http.delete(`/api/Deportes`, { params }).subscribe(resp => {
        if (resp === "1") {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }





}
