import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ModalOptionAceptedPage } from '../shared/pages/modals/modal-option-acepted/modal-option-acepted.page';
import { ModalWithOptionsPage } from '../shared/pages/modals/modal-with-options/modal-with-options.page';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(private route: Router, private modalController: ModalController) { }

  async getshowModalLinkForwarding() {
    const modal = await this.modalController.create({
      component: ModalWithOptionsPage,
      animated: true,
      backdropDismiss: true,
      componentProps: {
        icon: 'alert-circle',
        class: '',
        title: 'Usuario ingresado no ha sido activado',
        titleSubtitle: '¿Deseas que enviemos nuevamente el link de activación a tu correo?',
        downTitle: '',
        downSubtitle: '',
        buttonCancel: 'No',
        buttonConfirm: 'Si'
      },
      cssClass: 'custom-modal-team-all'
    });

    await modal.present();
  }

  async getshowModalOption(classStyle: string, title: string, titleSubtitle: string, downTitle: string, downSubtitle: string) {
    const modal = await this.modalController.create({
      component: ModalOptionAceptedPage,
      animated: true,
      backdropDismiss: false,
      componentProps: {
        icon: 'information-circle',
        class: classStyle,
        title: title,
        titleSubtitle: titleSubtitle,
        downTitle: downTitle,
        downSubtitle: downSubtitle,
        buttonConfirm: 'Aceptar'
      },
      cssClass: 'custom-modal-team-all'
    });

    await modal.present();
  }

  async getshowModalOptionRouter(classStyle: string, title: string, titleSubtitle: string, downTitle: string, downSubtitle: string, routerLink: string) {
    const modal = await this.modalController.create({
      component: ModalOptionAceptedPage,
      animated: true,
      backdropDismiss: false,
      componentProps: {
        icon: 'information-circle',
        class: classStyle,
        title: title,
        titleSubtitle: titleSubtitle,
        downTitle: downTitle,
        downSubtitle: downSubtitle,
        buttonConfirm: 'Aceptar'
      },
      cssClass: 'custom-modal-team-all'
    });

    await modal.present();

    await modal.onDidDismiss().then(() => {
      this.route.navigate([`${routerLink}`], { replaceUrl: true })
    });
  }
}
