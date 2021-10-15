import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  private usernameStorage: string = '';
  private teamnameStorage: string = '';
  private useremailStorage: string = '';


  constructor(private storage: StorageService, private http: HttpClient) {
  }

  getValidatorsPassword(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ 'isIncorret': true })
        return { 'isIncorret': true }
      }

      formGroup.get(campo2)?.setErrors(null)

      return null;
    }
  }

  getValidatorsName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      const username: string = control.value;

      if (username) {
        const params = new HttpParams()
          .set("NombreExiste", username);

        return this.http.post(`/api/usuarioexiste`, params)
          .pipe(
            map(resp => {
              return resp === '1' ? { username: true } : null;
            })
          );
      } else {
        return of(null);
      }
    };
  }

  getValidatorsNameTeam(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      const teamname = control.value;

      if (teamname) {

        const params = new HttpParams()
          .set("NombreEquipo", teamname);

        return this.http.post(`/api/ExisteEquipo`, params)
          .pipe(
            map(resp => {
              return resp === '0' ? { teamname: true } : null;
            })
          );
      } else {
        return of(null);
      }
    };
  }

  getValidatorsNameTeamProfile(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      this.storage.getString("nameTeam").then((nameTeam) => this.teamnameStorage = nameTeam.value);

      const teamname = control.value;

      if (teamname) {

        const params = new HttpParams()
          .set("NombreEquipo", teamname);

        return this.http.post(`/api/ExisteEquipo`, params)
          .pipe(
            map(resp => {
              return this.teamnameStorage == teamname ? null : this.teamnameStorage !== teamname && resp === '0' ? { teamname: true } : null;
            })
          );
      } else {
        return of(null);
      }
    };
  }


  getValidatorsNameProfile(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      this.storage.getObject("user").then((user) => this.usernameStorage = user['NombreUsuario']);

      const usernameParams = control.value;

      if (usernameParams) {
        const params = new HttpParams()
          .set("NombreExiste", usernameParams);

        return this.http.post(`/api/usuarioexiste`, params)
          .pipe(
            map(resp => {
              return this.usernameStorage == usernameParams ? null : this.usernameStorage !== usernameParams && resp == '1' ? { 'usernameExists': true } : null;
            })
          );

      }
      return of(null);
    };
  }

  getValidatorsEmailProfile(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      this.storage.getString('userEmail').then((email) => this.useremailStorage = email.value);

      const useremail = control.value;

      if (useremail) {
        const params = new HttpParams()
          .set("Email", useremail);

        return this.http.put(`/api/usuarioexiste`, params)
          .pipe(
            map(resp => {
              return (this.useremailStorage == useremail || this.useremailStorage == null) ? null : this.useremailStorage !== useremail && resp == '1' ? { 'useremailExists': true } : null;
            })
          );
      }

      return of(null);

    };
  }


  getValidatorsEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      const useremail: string = control.value;
      if (useremail) {
        const params = new HttpParams()
          .set("Email", useremail);

        return this.http.put(`/api/usuarioexiste`, params)
          .pipe(
            map(resp => {
              return resp === '1' ? { useremail: true } : null;
            })
          );
      } else {
        return of(null);
      }
    };
  }

  getValidatorsIssetEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      const useremail = control.value;
      if (useremail) {
        const params = new HttpParams()
          .set("Email", useremail);

        return this.http.put(`/api/usuarioexiste`, params)
          .pipe(
            map(resp => {
              return resp === '0' ? { useremail: true } : null;
            })
          );
      } else {
        return of(null);
      }
    };
  }

}
