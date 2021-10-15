 import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-with-options',
  templateUrl: './modal-with-options.page.html',
  styleUrls: ['./modal-with-options.page.scss'],
})
export class ModalWithOptionsPage implements OnInit {

  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() titleSubtitle: string = '';
  @Input() buttonCancel: string = '';
  @Input() buttonConfirm: string = '';
  @Input() downTitle: string = '';
  @Input() downSubtitle: string = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async closeModalOutParams(){
    await this.modalController.dismiss({
      params:false
    });
  }

  async closeModalWhitParams(){
    await this.modalController.dismiss({
      params:true
    });
  }

}
