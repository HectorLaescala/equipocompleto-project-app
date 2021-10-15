import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AlertsService {

    constructor(private route:Router, private modalCtrl: ModalController, private http: HttpClient, private alertController: AlertController, private loadingController: LoadingController) { }

    /**
     * FUNCION PARA ALERTAS CON STATUS SUCCESS 
     **/

    async SuccessAlert(header: string, message: string, messagetext: string) {

        const alert = await this.alertController.create({
          header: header,
          message: message,
          mode:"ios",
          buttons: [{
            text: 'Aceptar',
            handler: () => {
              alert.dismiss().then(() => { this.presentLoading( messagetext ); });
            }
          }],
          backdropDismiss: false
        });
    
        await alert.present();
      }

      async SuccessAlertRouter(header: string, message: string, url:string) {

        const alert = await this.alertController.create({
          header: header,
          message: message,
          mode:"ios",
          buttons: [{
            text: 'Aceptar',
            handler: () => {
              alert.dismiss().then(() => { this.route.navigate([`${url}`]); });
            }
          }],
          backdropDismiss: false
        });
    
        await alert.present();
      }

      async SuccessAlertOutModal(header: string, message: string, messagetext: string) {

        const alert = await this.alertController.create({
          header: header,
          message: message,
          mode:"ios",
          buttons: [{
            text: 'Aceptar',
            handler: () => {
              alert.dismiss().then(() => { this.presentLoadingOutModal( messagetext ); });
            }
          }],
          backdropDismiss: false
        });
    
        await alert.present();
      }


    /**
     * FUNCION PARA ALERTAS CON STATUS ERROR 
     **/

    async ErrorAlert(header: string, message: string) {

        const alert = await this.alertController.create({
          header: header,
          message: message,
          mode:'ios',
          buttons: ['Aceptar'],
          backdropDismiss: false
        });
    
        await alert.present();
      }
  

     /**
     * FUNCION PARA MOSTRAR LOADINGS
     **/

    async present(message:string) {
        await this.dismiss();
        await this.loadingController
            .create({ message: message, spinner: 'circles', mode:'ios' })
            .then(res => {
                res.present();
            });
    }

    /**
     * FUNCION PARA CERRAR LOADINGS
     **/

    async dismiss() {
        while (await this.loadingController.getTop() !== undefined) {
            await this.loadingController.dismiss();
        }
    }


    /**
     * FUNCION DE ION-LOADING EN LOS DEMAS MODULOS
     **/

    async presentLoading( messagetext: string) {
      
        const resp = await this.loadingController.create({
          message: messagetext,
          duration: 1000,
          spinner: 'circles',
          mode: 'ios'
        });
  
        await resp.present();
  
        await resp.onDidDismiss().then((dis) => {
          this.modalCtrl.dismiss();
        });
      }

      async presentLoadingOutModal( messagetext: string) {
      
        const resp = await this.loadingController.create({
          message: messagetext,
          duration: 1000,
          spinner: 'circles',
          mode: 'ios'
        });
  
        await resp.present();
      }


    /**
     * FUNCION PARA CERRAR MODALES
     **/

    async dissModal() {
        await this.modalCtrl.dismiss();
    }
}
