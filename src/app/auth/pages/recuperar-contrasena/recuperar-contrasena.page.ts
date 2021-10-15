import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Keyboard } from "@ionic-native/keyboard/ngx";

import { AlertsService } from '../../../services/alerts.service';
import { AuthService } from '../../services/auth.service';
import { ModalsService } from '../../../services/modals.service';
import { ValidationsService } from '../../../services/validations.service';


@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
  providers: [Keyboard],
})
export class RecuperarContrasenaPage implements OnInit {
  isKeyboardHide: boolean = true;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  formRecuperar: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.pattern(this.emailPattern)], [this.validationsService.getValidatorsIssetEmail()]]
  });

  public errorMessages = {
    email: [
      { type: "required", message: "Este dato es requerido" },
      { type: "pattern", message: "El E-mail ingresado no es válido" }
    ],
  };

  constructor(
    public keyboard: Keyboard,
    private modals: ModalsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private validationsService: ValidationsService,
    private alertsService: AlertsService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.keyboard.onKeyboardWillShow().subscribe(() => {
      this.isKeyboardHide = false;
    });

    this.keyboard.onKeyboardWillHide().subscribe(() => {
      this.isKeyboardHide = true;
    });
  }

  async getRecovery() {
    await this.alertsService.present('Cargando...');

    const { email } = this.formRecuperar.value;
    const valid = await this.authService.getRecovery(email);

    await this.alertsService.dismiss();

    if (valid) {
      await this.modals.getshowModalOptionRouter('style-icon-success', '¡Felicidades!', 'Se ha enviado una nueva clave de ', 'acceso al correo ingresado', '', '/login');
    } else {
      await this.modals.getshowModalOption('style-icon-error', 'Error! Al Solicitar Recuperación', '', 'Verifigue nuevamente el Email', '');
    }
  }

}
