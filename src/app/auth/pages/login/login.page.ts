import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { AuthService } from '../../services/auth.service';
import { AlertsService } from '../../../services/alerts.service';
import { ModalsService } from '../../../services/modals.service';
import { StorageService } from '../../../services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [Keyboard]
})
export class LoginPage implements OnInit {

  @ViewChild('passwordEyeRegister', { read: ElementRef, static: false }) public passwordEye: ElementRef;

  passwordTypeInput: string = 'password';
  isKeyboardHide: boolean = true;

  formLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email es requerido' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerida' }
    ]
  }

  constructor(private splashScreen: SplashScreen, private modals: ModalsService, private storage: StorageService, public keyboard: Keyboard, private formBuilder: FormBuilder, private authService: AuthService, private alertsService: AlertsService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.keyboard.onKeyboardWillShow().subscribe(() => this.isKeyboardHide = false);

    this.keyboard.onKeyboardWillHide().subscribe(() => this.isKeyboardHide = true);
  }


  ionViewDidEnter() {
    this.splashScreen.hide();
  }


  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }

  getLogin() {
    this.alertsService.present('Ingresando...');

    const { email, password } = this.formLogin.value;

    this.authService.getlogin(email, password).subscribe(valid => {

      this.alertsService.dismiss();

      if (valid == 0) {
        this.storage.clear();
        this.modals.getshowModalOption('style-icon-error', 'Error al iniciar sesión', '', 'Usuario y/o mail no se encuentra registrado', '');
      } else if (valid == 2) {
        this.storage.clear();
        this.modals.getshowModalOption('style-icon-error', 'Error al iniciar sesión', '', 'Usuario y/o Contraseña Inválida', '');
      } else if (valid == 3) {
        this.storage.clear();
        this.modals.getshowModalOption('style-icon-error', 'Cuenta no activada', '', 'Para activar tu cuenta debes aceder al enlace enviado a tu email. ', 'Revisa tambien en correos no deseados.');
      } else {
        this.storage.setObject("user", { 'IdUsuario': valid['IdUsuario'], 'IdTipoUsuario': valid['IdTipoUsuario'], 'NombreUsuario': valid['NombreUsuario'] });
        this.storage.setString("token", valid['Token']);
        this.modals.getshowModalOptionRouter('style-icon-success', '¡Felicidades!', '', 'Bienvenido...', '', '/dashboard');
      }
    }, () => {
      this.alertsService.dismiss();
      this.modals.getshowModalOption('style-icon-error', '¡Ha ocurrido un error!', '', 'Por favor intentalo mas tarde', '');
    });

  }




}
