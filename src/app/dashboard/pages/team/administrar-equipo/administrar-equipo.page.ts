import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalWithOptionsPage } from 'src/app/shared/pages/modals/modal-with-options/modal-with-options.page';

import {
  ageAverage,
  Deport,
  DeportsFavorite,
  GendersTeam,
  listMembers,
  TeamsUserProfile,
  TypeTeam,
} from 'src/app/dashboard/interfaces/team.interface';
import { EquipoService } from 'src/app/dashboard/services/equipo.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ModalsService } from 'src/app/services/modals.service';
import { ValidationsService } from 'src/app/services/validations.service';
import { StorageService } from 'src/app/services/storage.service';
import { InvitationService } from '../../../services/invitation.service';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AdministrarTipoRolePage } from '../administrar-tipo-role/administrar-tipo-role.page';

declare var window: any;

@Component({
  selector: 'app-administrar-equipo',
  templateUrl: './administrar-equipo.page.html',
  styleUrls: ['./administrar-equipo.page.scss'],
})
export class AdministrarEquipoPage {
  type: string;
  statusNotification: string = '';
  genderName: string = '';
  ageAverageName: string = '';
  typeTeamName: string = '';
  TempImage: string[] = [];
  pull: boolean = false;
  TeamsUserProfile: TeamsUserProfile[] = [];
  deportsFavorite: DeportsFavorite[] = [];
  genders: GendersTeam[] = [];
  AgeAverage: ageAverage[] = [];
  deports: Deport[] = [];
  typeTeam: TypeTeam[] = [];
  listMembers: listMembers[] = [];
  dataParams: any;
  idTeam: number = 0;
  selectedToggle: boolean = true;
  cantMembers: number = 0;
  routerLink: string = '';
  nameTeam: string = '';
  validated: boolean = false;
  listMembersNewPlayers$ = this.invitationService.listInvitationPlayers$;
  errorHandleNewPlayers$ = new Subject<boolean | null>();
  errorHandleNewPlayersScroll$ = new Subject<boolean | null>();

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) IonContent: IonContent;

  formTeamAddDeport: FormGroup = this.formBuilder.group({
    deport: ['', [Validators.required]],
  });

  formTeamsUserProfile: FormGroup = this.formBuilder.group({
    notification: ['', []],
    nombre: [
      '',
      [Validators.required],
      [this.validationsService.getValidatorsNameTeamProfile()],
    ],
    tipo: ['', [Validators.required]],
    edad: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    descripcion: ['', []],
  });

  public errorMessages = {
    nombre: [
      {
        type: 'required',
        message: 'Este dato es requerido',
      },
      {
        type: 'teamname',
        message: 'El nombre ya está siendo utilizado',
      },
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private camera: Camera,
    private formBuilder: FormBuilder,
    private validationsService: ValidationsService,
    private alertsService: AlertsService,
    private equipoService: EquipoService,
    private modals: ModalsService,
    private storage: StorageService,
    private modalController: ModalController,
    private invitationService: InvitationService
  ) {
    this.route.queryParams.subscribe(() => {
      if (router.getCurrentNavigation().extras.state) {
        this.dataParams =
          this.router.getCurrentNavigation().extras.state.params;
        this.idTeam = this.dataParams.id;
        this.cantMembers = this.dataParams.cantMembers;
        this.routerLink = this.dataParams.routerLink;
        this.nameTeam = this.dataParams.nameTeam;
      }
    });
  }


  onSearchPlayers() {
    const params = {
      id: this.idTeam,
      cantMembers: this.cantMembers,
      routerLink: this.routerLink,
      nameTeam: this.nameTeam,
    };

    let navigationExtras: NavigationExtras = {
      state: {
        params: params,
      },
    };

    this.router.navigate(['/dashboard/team/invite-players'], navigationExtras);
  }

  async ionViewDidEnter() {
    this.type = 'members';
    this.validated = true;
    await this.getGenders();
    await this.getAgeAverage();
    await this.getDeports();
    await this.getTypeTeam();
    await this.getMembersTeam();
    await this.getTeamsUserProfileForm();
    await this.getProfileTeamImage();
    this.getListInvitationNewPlayers();
  }

  ionViewWillLeave() {
    this.IonContent.scrollToTop();
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    this.errorHandleNewPlayers$.next(null);
    this.errorHandleNewPlayersScroll$.next(null);
  }

  async getMembersTeam() {
    await this.equipoService
      .getMembersTeam(this.idTeam)
      .subscribe((members) => {
        this.listMembers = members;
      });
  }

  async getGenders() {
    await this.equipoService.getGender().subscribe((genders) => {
      this.genders = genders;
    });
  }

  async getAgeAverage() {
    await this.equipoService.getAgeAverage().subscribe((ageAverage) => {
      this.AgeAverage = ageAverage;
    });
  }

  async getDeports() {
    await this.equipoService
      .getDeportsFavoritesTeam(this.idTeam)
      .subscribe((deports) => {
        this.deports = deports;
      });
  }

  async getTypeTeam() {
    await this.equipoService.getTypeTeam().subscribe((typeTeam) => {
      this.typeTeam = typeTeam;
    });
  }

  segmentChanged(event) {
    const type = event.detail.value;
    if (type == 'data') {
      this.formTeamsUserProfile.markAsPristine();
      this.getDeportsFavoriteTeam();
    }
  }

  changeGender(event, option: string) {
    if (option == 'genero') {
      this.genderName = event.detail.value.Descripcion;
    } else if (option == 'edad') {
      this.ageAverageName = event.detail.value.Descripcion;
    } else if (option == 'tipo') {
      this.typeTeamName = event.detail.value.Descripcion;
    }
  }

  async getUpdateTeamProfile() {
    const { nombre, descripcion, genero, tipo, edad } =
      this.formTeamsUserProfile.value;

    const data = {
      IdEquipo: this.idTeam,
      IdUsuarioCreador: this.TeamsUserProfile[0].IdUsuarioCreador,
      IdTipoUsuario: this.TeamsUserProfile[0].TipoUsuario[0].IdRolJugador,
      NombreEquipo: nombre,
      Descripcion: descripcion,
      IdGeneroEquipo: genero.IdGeneroEquipo,
      IdTipoEquipo: tipo.IdTipoEquipo,
      IdEdadPromedio: edad.IdEdadPromedio,
    };

    this.alertsService.present('Cargando...');

    const valid = await this.equipoService.getUpdateTeamProfile(data);

    this.alertsService.dismiss();

    if (valid) {
      this.storage.setString('nameTeam', nombre);
      this.formTeamsUserProfile.markAsPristine();
      this.getTeamsUserProfile();
      await this.modals.getshowModalOption(
        'style-icon-success',
        '¡Perfil del equipo editado exitosamente!',
        '',
        '',
        ''
      );
    } else {
      await this.modals.getshowModalOption(
        'style-icon-error',
        '!Error! al editar perfil del equipo',
        '',
        'Verifigue nuevamente los campos',
        ''
      );
    }
  }

  getAddPhotoProfile() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.getExecuteImageProfile(options);
  }

  getAddLibraryProfile() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

    this.getExecuteImageProfile(options);
  }

  getExecuteImageProfile(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        const img = window.Ionic.WebView.convertFileSrc(imageData);
        this.TempImage = [];
        this.equipoService.getUploadFileTeamImage(imageData, this.idTeam);
        this.TempImage.push(img);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async getDeportsFavoriteTeam(event?) {
    event ? (this.pull = false) : (this.pull = true);

    await this.equipoService
      .getDeportsFavoriteTeam(this.idTeam, this.pull)
      .subscribe((deportsFavorite) => {
        if (this.pull) {
          this.deportsFavorite = [];
        }

        if (deportsFavorite.DeportesFavEquipo) {
          this.deportsFavorite.push(...deportsFavorite.DeportesFavEquipo);
        }

        this.infiniteScroll.complete();

        if (deportsFavorite.DeportesFavEquipo === undefined) {
          this.infiniteScroll.disabled = true;
        } else {
          this.infiniteScroll.disabled = false;
        }
      });
  }

  onScrollTop() {
    this.IonContent.scrollToTop(1000);
  }

  async getAddTeamDeport() {
    const params = this.formTeamAddDeport.value;

    const data = {
      IdEquipo: this.idTeam,
      IdDeporte: params.deport.IdDeporte,
    };

    this.alertsService.present('Cargando...');

    const valid = await this.equipoService.getAddTeamDeport(data);

    this.alertsService.dismiss();

    if (valid) {
      await this.modals.getshowModalOption(
        'style-icon-success',
        '¡Deporte agregado exitosamente!',
        '',
        '',
        ''
      );
      await this.getDeports();
      await this.getDeportsFavoriteTeam();
      this.formTeamAddDeport.reset();
    } else {
      await this.modals.getshowModalOption(
        'style-icon-error',
        '¡Ha ocurrido un error!',
        '',
        'Por favor intentalo mas tarde',
        ''
      );
    }
  }

  async getProfileTeamImage() {
    this.equipoService.getProfileTeamImage(this.idTeam).subscribe((resp) => {
      this.TempImage = [];
      this.TempImage.push(resp['ImagenEquipo']);
    });
  }

  async getRemoveTeamDeport(IdDeporte: number, NombreDeporte: string) {
    const modal = await this.modalController.create({
      component: ModalWithOptionsPage,
      animated: true,
      backdropDismiss: false,
      componentProps: {
        icon: 'alert-circle-outline',
        title: '¿Seguro/a deseas quitar el deporte',
        titleSubtitle: `${NombreDeporte}`,
        downTitle: '',
        downSubtitle: '',
        buttonCancel: 'No',
        buttonConfirm: 'Si',
      },
      cssClass: 'custom-modal-team-all',
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data.params) {
      this.alertsService.present('Cargando...');

      const valid = await this.equipoService.getRemoveTeamDeport(
        this.idTeam,
        IdDeporte
      );

      this.alertsService.dismiss();

      if (valid) {
        await this.modals.getshowModalOption(
          'style-icon-success',
          `Deporte ${NombreDeporte} ha sido eliminado correctamente`,
          '',
          '',
          ''
        );
        await this.getDeports();
        await this.getDeportsFavoriteTeam();
        this.onScrollTop();
      } else {
        await this.modals.getshowModalOption(
          'style-icon-error',
          '¡Ha ocurrido un error!',
          '',
          'Por favor intentalo mas tarde',
          ''
        );
      }
    }
  }

  async getTeamsUserProfileForm() {
    await this.equipoService
      .getTeamsUserProfile(this.idTeam)
      .subscribe((resp) => {
        this.TeamsUserProfile.push(resp);

        this.formTeamsUserProfile.reset({
          nombre: resp.NombreEquipo,
          tipo: {
            IdTipoEquipo: resp.TipoEquipo[0].IdTipoEquipo,
            Descripcion: resp.TipoEquipo[0].Descripcion,
          },
          genero: {
            IdGeneroEquipo: resp.Genero[0].IdGenero,
            Descripcion: resp.Genero[0].Descripcion,
          },
          edad: {
            IdEdadPromedio: resp.EdadPromedio[0].IdEdadPromedio,
            Descripcion: resp.EdadPromedio[0].EdadPromedio,
          },
          descripcion: resp.Descripcion,
        });

        this.statusNotification = resp.IdActivaInvitacion;
        this.storage.setString('nameTeam', resp.NombreEquipo);
        this.genderName = resp.Genero[0].Descripcion;
        this.typeTeamName = resp.TipoEquipo[0].Descripcion;
        this.ageAverageName = resp.EdadPromedio[0].EdadPromedio;
        this.selectedToggle = resp.IdActivaInvitacion == '1' ? true : false;
      });
  }

  getTeamsUserProfile() {
    this.equipoService.getTeamsUserProfile(this.idTeam).subscribe((resp) => {
      this.TeamsUserProfile = [];
      this.TeamsUserProfile.push({ ...resp });
    });
  }

  onChangeToggle() {
    const { notification } = this.formTeamsUserProfile.value;
    let valueNotification: number = 0;

    notification ? (valueNotification = 1) : (valueNotification = 0);

    this.alertsService.present('Cargando...');

    this.equipoService
      .getActiveInvitationSwitch(this.idTeam, valueNotification)
      .subscribe(
        (resp) => {
          if (resp == '1') {
            this.selectedToggle = notification == 1 ? true : false;
            this.alertsService.dismiss();
            this.modals.getshowModalOption(
              'style-icon-success',
              `Se ha guardado correctamente la configuración`,
              '',
              '',
              ''
            );
          } else {
            this.selectedToggle = false;
            this.alertsService.dismiss();
            this.modals.getshowModalOption(
              'style-icon-error',
              '¡Ha ocurrido un error!',
              '',
              'Por favor intentalo mas tarde',
              ''
            );
          }
        },
        () => {
          this.selectedToggle = false;
          this.alertsService.dismiss();
          this.modals.getshowModalOption(
            'style-icon-error',
            '¡Ha ocurrido un error!',
            '',
            'Por favor intentalo mas tarde',
            ''
          );
        }
      );
  }

  onGetOutTeam() {
    this.equipoService
      .getOutTeam(this.storage.userProfile.IdUsuario, this.idTeam)
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  getListInvitationNewPlayers() {
    this.invitationService.getListInvitationNewPlayers(this.idTeam).pipe(
      catchError((err) => {
        this.errorHandleNewPlayers$.next(true);
        return throwError(err);
      })).subscribe();
  }

  getListInvitationNewPlayersScroll(event) {
    if (event) {
      this.invitationService.getListInvitationNewPlayersScroll(this.idTeam).pipe(
        tap(([resp]) => {

          event.target.complete();

          if (resp?.length === 0) {
            event.target.disabled = true;
          }
        }),
        catchError((err) => {
          event.target.complete();
          event.target.disabled = true;
          this.errorHandleNewPlayersScroll$.next(true);
          return throwError(err);
        })).subscribe();
    }
  }

  async showModalRole(typeRole: number, listMembers: listMembers) {
    if (typeRole == 2) {
      await this.showModalEditAdministration(typeRole,listMembers);
    }
  }

  async showModalEditAdministration(typeRole:number,listMembers: listMembers) {
    const modal = await this.modalController.create({
      component: AdministrarTipoRolePage,
      animated: true,
      backdropDismiss: false,
      componentProps: {
        listMembers,
        typeRole
      },
      cssClass: 'custom-modal-team-all'
    });
    return await modal.present();
  }

}
