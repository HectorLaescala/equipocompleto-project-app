import { Component, OnInit } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { TeamUsers } from "src/app/dashboard/interfaces/team.interface";
import { EquipoService } from "src/app/dashboard/services/equipo.service";

import { StorageService } from "src/app/services/storage.service";
import { UsersService } from "../../../services/users.service";
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage implements OnInit {

  errorHandle$ = new Subject<boolean>();
  carouselInvitationPlayers$ = this.usersService.carouselInvitationPlayers$;
  teamUsers$: Observable<TeamUsers[]>;
  TempImage: string[] = [];
  username: string = "";
  idusername: number = 0;

  constructor(
    private router: Router,
    private equipo: EquipoService,
    private storage: StorageService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getProfilePicture();
    this.getCarouselInvitationPlayers();
    this.getTeamsUser();
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
    this.usersService.getCarouselInvitationPlayers(this.storage.userProfile.IdUsuario).pipe(
      catchError((err) => {
        this.errorHandle$.next(true);
        return throwError(err);
      })).subscribe();

  }

  getCarouselInvitationPlayersScroll(event) {
    if (event) {
      this.usersService.getCarouselInvitationPlayersScroll(this.storage.userProfile.IdUsuario).pipe(
        catchError((err) => {
          this.errorHandle$.next(true);
          return throwError(err);
        })).subscribe();
    }
  }

}
