import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../services/storage.service';
import { TeamUsers } from 'src/app/dashboard/interfaces/team.interface';
import { EquipoService } from 'src/app/dashboard/services/equipo.service';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-mis-equipos',
  templateUrl: './mis-equipos.page.html',
  styleUrls: ['./mis-equipos.page.scss'],
})
export class MisEquiposPage implements OnInit {

  errorHandle$ = new Subject<boolean>();
  teamAdministrator$: Observable<TeamUsers[]>;
  teamMembers$: Observable<TeamUsers[]>;

  constructor(private router: Router, private storage: StorageService, private equipo: EquipoService) { }
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getTeamsUserAdministrator();
    this.getTeamsUserMembers();
  }

  getModalManageTeam(id: number, cantMembers: number, routerLink: string, nameTeam: string) {
    const params = {
      id,
      cantMembers,
      routerLink,
      nameTeam
    }

    let navigationExtras: NavigationExtras = {
      state: {
        params: params
      }
    }

    this.router.navigate(['/dashboard/team/profile-team'], navigationExtras);
  }

  getModalManageTeamUser(id: number, typeInvitation: string) {
    const params = {
      id,
      typeInvitation
    }

    let navigationExtras: NavigationExtras = {
      state: {
        params: params
      }
    }

    this.router.navigate(['/dashboard/team/detail-team'], navigationExtras);
  }

  getTeamsUserAdministrator() {
    this.teamAdministrator$ = this.equipo.getTeamsUser(this.storage.userProfile.IdUsuario).pipe(
      map((items: TeamUsers[]) =>
        items.filter((item: TeamUsers) => item.TipoUsuario === 'ADMINISTRADOR PRINCIPAL')
      ),
      catchError((err) => {
        this.errorHandle$.next(true);
        return throwError(err);
      })
    );
  }

  getTeamsUserMembers() {
    this.teamMembers$ = this.equipo.getTeamsUser(this.storage.userProfile.IdUsuario).pipe(
      map((items: TeamUsers[]) =>
        items.filter((item: TeamUsers) => item.TipoUsuario !== 'ADMINISTRADOR PRINCIPAL')
      ),
      catchError((err) => {
        this.errorHandle$.next(true);
        return throwError(err);
      })
    );
  }

}
