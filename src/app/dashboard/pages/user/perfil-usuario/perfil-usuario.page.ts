import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

import { ValidationsService } from "../../../../services/validations.service";
import { StorageService } from "src/app/services/storage.service";


import { ModalWithOptionsPage } from "src/app/shared/pages/modals/modal-with-options/modal-with-options.page";
import { IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ModalsService } from '../../../../services/modals.service';
import { AlertsService } from '../../../../services/alerts.service';
import { Deport, DeportsUser, Genders, Region } from "src/app/auth/interfaces/user.interface";
import { UsersService } from "../../../services/users.service";

declare var window: any;

@Component({
  selector: "app-perfil-usuario",
  templateUrl: "./perfil-usuario.page.html",
  styleUrls: ["./perfil-usuario.page.scss"],
})
export class PerfilUsuarioPage implements OnInit {
  type: string;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  TempImage: string[] = [];
  genders: Genders[] = [];
  regions: Region[] = [];
  deports: Deport[] = [];
  deportsFavorite: DeportsUser[] = [];
  genderName: string = "";
  username: string = "";
  pull: boolean = false;

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: false }) IonContent: IonContent;

  formUserAddDeport: FormGroup = this.formBuilder.group({
    deport: ["", [Validators.required]],
  });


  formUserProfile: FormGroup = this.formBuilder.group(
    {
      nameuser: ["", [Validators.required], [this.validationsService.getValidatorsNameProfile()]],
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)], [this.validationsService.getValidatorsEmailProfile()]],
      fecha: ["", [Validators.required]],
      genero: ["", [Validators.required]],
      region: ["", [Validators.required]],
      telefono: ["", [Validators.minLength(13)]],
      password: ["", [Validators.required]],
      repassword: ["", [Validators.required]],
    },
    {
      validators: [
        this.validationsService.getValidatorsPassword("password", "repassword"),
      ]
    }
  );

  public errorMessages = {
    nameuser: [
      { type: "required", message: "Nombre de usuario es requerido" },
      {
        type: "usernameExists",
        message: "El nombre de usuario ya ha sido tomado",
      },
    ],
    email: [
      { type: "required", message: "E-mail es requerido" },
      { type: "pattern", message: "El E-mbail ingresado no es válido" },
      { type: "useremailExists", message: "El E-mail ya ha sido tomado" },
    ],
    telefono: [{ type: "minlength", message: "Formato de teléfono inválido" }],
    password: [{ type: "required", message: "Contraseña es requerida" }],
    repassword: [
      { type: "required", message: "Confirmar constraseña es requerida" },
      { type: "isIncorret", message: "Deben coinicidir las contraseñas" },
    ],
  };

  constructor(
    private camera: Camera,
    private modals: ModalsService,
    private storage: StorageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private modalController: ModalController,
    private validationsService: ValidationsService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.type = "my-data";
    await this.getRegions();
    await this.getGenders();
    await this.getDeports();
    this.getProfilePicture();
  }

  segmentChanged(event) {
    const type = event.detail.value;
    if (type == "my-data") {
      this.formUserProfile.markAsPristine();
      this.getStroage();
    } else {
      this.loadData();
    }
  }

  async getStroage() {
    await this.usersService.getDataUser(this.storage.userProfile.IdUsuario).subscribe(userProfile => {

      this.formUserProfile.reset({
        nameuser: userProfile["NombreUsuario"],
        email: userProfile["Email"],
        fecha: userProfile["FechaNacimiento"],
        genero: {
          IdGenero: userProfile['Genero'][0]['IdGenero'],
          Descripcion: userProfile['Genero'][0]['Descripcion'],
        },
        region: {
          IdRegion: userProfile["Region"][0]["IdRegion"],
          Descripcion: userProfile["Region"][0]["RegionNombre"],
        },
        telefono: userProfile["Telefono"],
        password: userProfile["Contraseña"],
        repassword: userProfile["Contraseña"]
      });

      this.storage.setString('userEmail', userProfile["Email"]);
      this.genderName = userProfile['Genero'][0]['Descripcion'];
      this.username = this.storage.userProfile.NombreUsuario;
    });
  }

  async getEditDataUser() {
    const {
      nameuser,
      email,
      fecha,
      genero,
      region,
      telefono,
      password,
    } = this.formUserProfile.value;

    const data = {
      "IdUsuario": this.storage.userProfile.IdUsuario,
      "IdTipoUsuario": this.storage.userProfile.IdTipoUsuario,
      "Email": email,
      "Telefono": telefono,
      "Contraseña": password,
      "IdRegion": region.IdRegion,
      "IdGenero": genero.IdGenero,
      "FechaNacimiento": fecha,
      "NombreUsuario": nameuser,
    };

    this.alertsService.present('Cargando...');

    const valid = await this.usersService.getEditDataUser(
      data,
      nameuser,
      this.storage.userProfile.IdTipoUsuario,
      this.storage.userProfile.IdUsuario
    );

    this.alertsService.dismiss();

    if (valid) {
      this.username = nameuser;
      this.formUserProfile.markAsPristine();
      await this.modals.getshowModalOption('style-icon-success', '¡Felicidades!', '', 'Perfil editado exitosamente', '');
    } else {
      await this.modals.getshowModalOption('style-icon-error', '!Error! Al Editar Perfil', '', 'Verifigue Nuevamente los Campo', '');
    }
  }

  async getAddUserDeport() {

    const params = this.formUserAddDeport.value;

    const data = {
      "IdUsuario": this.storage.userProfile.IdUsuario,
      "IdDeporte": params.deport.IdDeporte,
    };

    this.alertsService.present('Cargando...');

    const valid = await this.usersService.getAddUserDeport(data);

    this.alertsService.dismiss();

    if (valid) {
      await this.modals.getshowModalOption('style-icon-success', '¡Felicidades!', '', 'Deporte agregado', '');
      await this.getDeports();
      await this.loadData();
      this.formUserAddDeport.reset();
    }
  }

  async getGenders() {
    await this.usersService.getGender().subscribe((genders) => {
      this.genders = genders;
    });
  }

  async getRegions() {
    await this.usersService.getRegion().subscribe((regions) => {
      this.regions = regions;
    });
  }

  async getDeports() {
    await this.usersService.getDeports().subscribe((deports) => {
      this.deports = deports;
    });
  }


  changeGender(event) {
    this.genderName = event.detail.value.Descripcion;
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

  getExecuteImageProfile(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        const img = window.Ionic.WebView.convertFileSrc(imageData);
        this.TempImage = [];
        this.usersService.getUploadFileImage(imageData, this.storage.userProfile.Token);
        this.TempImage.push(img);
      },
      (err) => {
        console.log(err);
      }
    );
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

  getProfilePicture() {
    this.usersService.getProfileImage(this.storage.userProfile.IdUsuario).subscribe((resp) => {
      this.TempImage = [];
      this.TempImage.push(resp["Imagen"]);
    });
  }

  async loadData(event?) {

    (event) ? this.pull = false : this.pull = true;

    await this.usersService.getDeportsFavorite(this.storage.userProfile.IdUsuario, this.pull).subscribe((deportsFavorite) => {

      if (this.pull) {
        this.deportsFavorite = [];
      }

      if (deportsFavorite.DeportesFavoritos) {
        this.deportsFavorite.push(...deportsFavorite.DeportesFavoritos);
      }

      this.infiniteScroll.complete();

      if (deportsFavorite.DeportesFavoritos === undefined) {
        this.infiniteScroll.disabled = true;
      } else {
        this.infiniteScroll.disabled = false;
      }

    });
  }

  onScrollTop() {
    this.IonContent.scrollToTop(1000);
  }

  async getRemoveUserDeport(idDeporte: number, nombreDeporte: string) {

    const modal = await this.modalController.create({
      component: ModalWithOptionsPage,
      animated: true,
      backdropDismiss: false,
      componentProps: {
        icon: 'alert-circle-outline',
        title: '¿Seguro/a deseas quitar el deporte',
        titleSubtitle: `${nombreDeporte}`,
        downTitle: '',
        downSubtitle: '',
        buttonCancel: 'No',
        buttonConfirm: 'Si'
      },
      cssClass: 'custom-modal-team-all'
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data.params) {

      this.alertsService.present('Cargando...');

      const valid = await this.usersService.getRemoveUserDeport(this.storage.userProfile.IdUsuario, idDeporte);

      this.alertsService.dismiss();

      if (valid) {
        await this.modals.getshowModalOption('style-icon-success', `Deporte ${nombreDeporte} ha sido eliminado correctamente`, '', '', '');
        await this.getDeports();
        await this.loadData();
        this.onScrollTop();
      } else {
        await this.modals.getshowModalOption('style-icon-error', '¡Ha ocurrido un error!', '', 'Por favor intentalo mas tarde', '');
      }

    }
  }
}
