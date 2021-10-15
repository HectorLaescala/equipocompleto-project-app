import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@capacitor/storage';

import { authResponse, Profile } from "../auth/interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class StorageService {

  private _userProfile: Profile = {};
  private token: string = '';

  get userProfile() {
    return { ...this._userProfile };
  }

  constructor(private router: Router, private http: HttpClient) { }

  async setString(key: string, value: string) {
    await Storage.set({ key, value });
  }

  async getString(key: string): Promise<{ value: any }> {
    return await Storage.get({ key });
  }

  async setObject(key: string, value: any) {
    await Storage.set({ key, value: JSON.stringify(value) });
  }

  async getObject(key: string): Promise<{ value: any }> {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  async removeItem(key: string) {
    await Storage.remove({ key });
  }

  async clear() {
    await Storage.clear();
  }

  async loadToken() {
    await this.getString('token').then((data) => { this.token = (data) ? data.value : null });
  }

  async getValidateToken(): Promise<boolean> {
    await this.loadToken();

    if (!this.token) {
      this.router.navigate(['auth/login']);
      return Promise.resolve(false);
    }

    await this.getSaveStroageUser(this.token);

    return new Promise<boolean>(resolve => {
      this.http.post<authResponse>(`/api/refreshtoken`, null).subscribe(async resp => {
        if (resp.code) {
          this.setString("token", resp.token);
          await this.getSaveStroageUser(resp.token);
          resolve(true);
        } else {
          resolve(false);
          this.router.navigate(['auth/login']);
          this.clear();
        }

      });

    });
  }

  async getSaveStroageUser(token: string) {
    await this.getObject("user").then((data) => {
      this._userProfile = {
        IdTipoUsuario: data['IdTipoUsuario'],
        NombreUsuario: data['NombreUsuario'],
        IdUsuario: data['IdUsuario'],
        Token: token
      }
    });
  }

}
