import { Component, OnInit } from "@angular/core";
import { NavController, MenuController } from "@ionic/angular";
import { ModalController, LoadingController } from '@ionic/angular';

import { ModalWithOptionsPage } from "src/app/shared/pages/modals/modal-with-options/modal-with-options.page";

import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  constructor(
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private storage: StorageService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async closeSesion() {
  
    const modal = await this.modalController.create({
      component: ModalWithOptionsPage,
      animated:true,
      backdropDismiss: false,
      componentProps:{
        icon: 'alert-circle-outline',
        title:'¿Estas seguro que deseas',
        titleSubtitle: 'cerrar sesión?',
        downTitle: '',
        downSubtitle: '',
        buttonCancel: 'No',
        buttonConfirm: 'Si'
      },
      cssClass: 'custom-modal-team-all'
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();
  
    if(data.params){
      this.storage.clear();
      this.presentLoadingOutModal('Saliendo...');
    } 

  }

  
  async presentLoadingOutModal( messagetext: string) {
      
    const resp = await this.loadingController.create({
      message: messagetext,
      duration: 1000,
      spinner: 'circles',
      mode: 'ios'
    });

    await resp.present();

    await resp.onDidDismiss().then((dis) => {
      this.navCtrl.navigateRoot("/auth/login");
    });
  }

  togglemenu() {
    this.menuCtrl.toggle();
  }
}
