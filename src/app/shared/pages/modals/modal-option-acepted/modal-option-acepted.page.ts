import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-option-acepted',
  templateUrl: './modal-option-acepted.page.html',
  styleUrls: ['./modal-option-acepted.page.scss'],
})
export class ModalOptionAceptedPage implements OnInit {

  @Input() icon: string = '';
  @Input() class: string = '';
  @Input() title: string = '';
  @Input() titleSubtitle: string = '';
  @Input() buttonConfirm: string = '';
  @Input() downTitle: string = '';
  @Input() downSubtitle: string = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

}
