import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-filtro-buscador',
  templateUrl: './filtro-buscador.page.html',
  styleUrls: ['./filtro-buscador.page.scss'],
})
export class FiltroBuscadorPage implements OnInit {
  radioSelected: string = '';

  radio_list = [
    {
      "title": 'DEPORTE',
      "name": 'Todos los deportes',
      "value": '0'
    },
    {
      "title": 'DEPORTE',
      "name": 'Solo mis deportes',
      "value": '1'
    },
    {
      "title": 'GENERO',
      "name": 'Masculino',
      "value": '2'
    },
    {
      "title": 'GENERO',
      "name": 'Femenino',
      "value": '3'
    },
    {
      "title": 'GENERO',
      "name": 'Cualquiera',
      "value": '4'
    }
  ]

  constructor(public modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.radioSelected = this.navParams.data.radioSelected;
  }

  async closeModalFilter() {
    await this.modalController.dismiss(null);
  }

  async closePresentFilterParams() {
    await this.modalController.dismiss(this.radioSelected);
  }

  itemClicked(item: string) {
    this.radioSelected = item;
  }

}
