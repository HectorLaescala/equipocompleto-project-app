import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Keyboard } from "@ionic-native/keyboard/ngx";

import { Region, Genders } from "../../interfaces/auth.interface";

import { AlertsService } from '../../../services/alerts.service';
import { AuthService } from '../../services/auth.service';
import { ModalsService } from '../../../services/modals.service';
import { ValidationsService } from '../../../services/validations.service';


@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"],
  providers: [Keyboard]
})
export class RegistroPage implements OnInit {
  isKeyboardHide: boolean = true;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  genders: Genders[] = [];
  regions: Region[] = [];

  formRegistro: FormGroup = this.formBuilder.group({
    nombre: ["", [Validators.required], [this.validationsService.getValidatorsName()]],
    email: ["", [Validators.required, Validators.pattern(this.emailPattern)], [this.validationsService.getValidatorsEmail()]],
    genero: ["", [Validators.required]],
    region: ["", [Validators.required]],
    telefono: ["", []],
    contrasena: ["", [Validators.required]],
    recontrasena: ["", [Validators.required]],
  }, {
    validators: [this.validationsService.getValidatorsPassword('contrasena', 'recontrasena')]
  });

  public errorMessages = {
    nombre: [{ type: "required", message: "Este dato es requerido" }],
    email: [
      { type: "required", message: "Este dato es requerido" },
      { type: "pattern", message: "El E-mail ingresado no es válido" }
    ],
    genero: [{ type: "required", message: "Este dato es requerido" }],
    region: [{ type: "required", message: "Este dato es requerido" }],
    contrasena: [{ type: "required", message: "Este dato es requerido" }],
    recontrasena: [
      { type: "required", message: "Este dato es requerido" },
      { type: "isIncorret", message: "Cotraseñas no son iguales" }
    ],
  };

  constructor(
    public keyboard: Keyboard,
    private modals: ModalsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private validationsService: ValidationsService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
    this.getGenders();
    this.getRegions();
  }

  async ionViewWillEnter() {
    this.keyboard.onKeyboardWillShow().subscribe(() => {
      this.isKeyboardHide = false;
    });

    this.keyboard.onKeyboardWillHide().subscribe(() => {
      this.isKeyboardHide = true;
    });
  }

  async getRegister() {
    const { nombre, email, genero, region, telefono, contrasena } = this.formRegistro.value;

    const data = {
      "Email": email,
      "IdGenero": genero,
      "NombreUsuario": nombre,
      "Telefono": '+56 ' + telefono,
      "IdTipoUsuario": 1,
      "Contraseña": contrasena,
      "IdRegion": region,
    };

    await this.alertsService.present('Cargando...');

    const valid = await this.authService.getRegister(data);

    await this.alertsService.dismiss();

    if (valid) {
      this.modals.getshowModalOptionRouter('style-icon-success', 'Te has registrado con éxito!', 'Para activar tu cuenta ingresa al ', 'enlace que enviamos al mail que registraste', '', '/login');
    } else {
      this.modals.getshowModalOption('style-icon-error', 'Error al registrarse', '', 'Verifigue nuevamente los campos', '');
    }


  }

  getGenders() {
    this.authService.getGender().subscribe((genders) => {
      this.genders.push(...genders);
    });
  }

  getRegions() {
    this.authService.getRegion().subscribe((regions) => {
      this.regions.push(...regions);
    });
  }

}
