import { Component } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, finalize, startWith } from "rxjs/operators";
import { TeamUsers } from "src/app/dashboard/interfaces/team.interface";
import { EquipoService } from "src/app/dashboard/services/equipo.service";

import { StorageService } from "src/app/services/storage.service";
import { UsersService } from "../../../services/users.service";
import { NavigationExtras, Router } from '@angular/router';
import { InvitationService } from '../../../services/invitation.service';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage {

  errorHandle$ = new Subject<boolean | null>();
  errorHandleTeams$ = new Subject<boolean | null>();
  errorHandleScroll$ = new Subject<boolean | null>();
  errorHandleTeamsScroll$ = new Subject<boolean | null>();
  carouselLoading$ = new Subject<boolean | null>();
  carouselLoadingTeams$ = new Subject<boolean | null>();
  carouselInvitationPlayers$ = this.invitationService.carouselInvitationPlayers$;
  carouselInvitationTeams$ = this.invitationService.carouselInvitationTeams$;
  teamUsers$: Observable<TeamUsers[]>;
  TempImage: string[] = [];
  username: string = "";
  idusername: number = 0;

  constructor(
    private router: Router,
    private equipo: EquipoService,
    private storage: StorageService,
    private usersService: UsersService,
    private invitationService: InvitationService
  ) { }

  ionViewWillEnter() {
    this.carouselLoading$.next(null);
    this.errorHandleScroll$.next(null);
    this.errorHandle$.next(null);
    this.getProfilePicture();
    this.getCarouselInvitationPlayers();
    this.getTeamsUser();
    this.getCarouselInvitationTeams();
  }

  getModalManageTeam(id: number, cantMembers: number, routerLink: string, nameTeam: string, typeRole: string) {

    if (typeRole !== 'JUGADOR') {

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
      return;
    } else {

      const params = {
        id,
        typeInvitation: 'leave'
      }

      let navigationExtras: NavigationExtras = {
        state: {
          params: params
        }
      }

      this.router.navigate(['/dashboard/team/detail-team'], navigationExtras);
    }

  }

  showPageInvitation(id: number, typeInvitation: string, idInvitation: number) {
    const params = {
      id,
      typeInvitation,
      idInvitation
    }

    let navigationExtras: NavigationExtras = {
      state: {
        params: params
      }
    }

    this.router.navigate(['/dashboard/team/detail-team'], navigationExtras);
  }

  getProfilePicture() {

    this.idusername = this.storage.userProfile.IdUsuario;
    this.username = this.storage.userProfile.NombreUsuario;

    this.usersService.getProfileImage(this.storage.userProfile.IdUsuario).subscribe((resp) => {
      this.TempImage = [];
      this.TempImage.push(resp["Imagen"]);
    });

  }

  getTeamsUser() {
    this.teamUsers$ = this.equipo.getTeamsUser(this.storage.userProfile.IdUsuario).pipe(
      catchError((err) => {
        this.errorHandle$.next(true);
        return throwError(err);
      }));
  }

  getCarouselInvitationPlayers() {
    this.invitationService.getCarouselInvitationPlayers(this.storage.userProfile.IdUsuario).pipe(
      catchError((err) => {
        this.errorHandle$.next(true);
        return throwError(err);
      })).subscribe();

  }

  getCarouselInvitationPlayersScroll(event) {
    if (event) {
      this.invitationService.getCarouselInvitationPlayersScroll(this.storage.userProfile.IdUsuario).pipe(
        startWith(this.carouselLoading$.next(true)),
        finalize(() => this.carouselLoading$.next(null)),
        catchError((err) => {
          this.errorHandleScroll$.next(true);
          return throwError(err);
        })).subscribe();
    }
  }

  getCarouselInvitationTeams() {
    this.invitationService.getCarouselInvitationTeams().pipe(
      catchError((err) => {
        this.errorHandleTeams$.next(true);
        return throwError(err);
      })).subscribe();
  }

  getCarouselInvitationTeamsScroll(event) {
    if (event) {
      this.invitationService.getCarouselInvitationTeamsScroll().pipe(
        startWith(this.carouselLoadingTeams$.next(true)),
        finalize(() => this.carouselLoadingTeams$.next(null)),
        catchError((err) => {
          this.errorHandleTeamsScroll$.next(true);
          return throwError(err);
        })).subscribe();
    }
  }


}
