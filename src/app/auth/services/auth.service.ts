import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Genders, Region } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getlogin(email: string, password: string) {

    const params = new HttpParams()
      .set("usuario", email)
      .set("contraseña", password);

    return this.http.post(`/api/Login`, params);
  }

  getRegister(data: object) {
    const params = new HttpParams()
      .set("Email", data['Email'])
      .set("IdGenero", data['IdGenero'])
      .set("NombreUsuario", data['NombreUsuario'])
      .set("Telefono", data['Telefono'])
      .set("IdTipoUsuario", data['IdTipoUsuario'])
      .set("Contraseña", data['Contraseña'])
      .set("IdRegion", data['IdRegion']);

    return new Promise(resolve => {

      this.http.post(`/api/Usuario`, params).subscribe(resp => {
        if (resp == 0 || resp == 1) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  getGender() {
    return this.http.get<Genders[]>(`/api/genero`);
  }

  getRegion() {
    return this.http.get<Region[]>(`/api/Region?IdPais=40`);
  }


  getRecovery(email: string) {

    const params = new HttpParams()
      .set("email", email);

    return new Promise(resolve => {

      this.http.post(`/api/contrasena`, params).subscribe(resp => {
        if (resp === 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

}
