import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ageAverage, Deport, GendersTeam } from 'src/app/dashboard/interfaces/team.interface';

import { AlertsService } from '../../../../services/alerts.service';
import { EquipoService } from 'src/app/dashboard/services/equipo.service';
import { ModalsService } from '../../../../services/modals.service';
import { StorageService } from '../../../../services/storage.service';
import { ValidationsService } from '../../../../services/validations.service';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.page.html',
  styleUrls: ['./crear-equipo.page.scss'],
})
export class CrearEquipoPage implements OnInit {

  genders: GendersTeam[] = [];
  AgeAverage: ageAverage[] = [];
  deports: Deport[] = [];

  formRegistroEquipo: FormGroup = this.formBuilder.group({
    nombre: ["", [Validators.required], [this.validationsService.getValidatorsNameTeam()]],
    tipo: ["", [Validators.required]],
    edad: ["", [Validators.required]],
    genero: ["", [Validators.required]],
    deporte: ["", [Validators.required]],
    descripcion: ["", []]
  });

  public errorMessages = {
    nombre: [{ type: "required", message: "Este dato es requerido" }, {
      type: "teamname",
      message: "El nombre ya está siendo utilizado",
    },],
    tipo: [{ type: "required", message: "Este dato es requerido" }],
    edad: [{ type: "required", message: "Este dato es requerido" }],
    genero: [{ type: "required", message: "Este dato es requerido" }],
    deporte: [{ type: "required", message: "Este dato es requerido" }]
  };

  constructor(private alertsService: AlertsService, private validationsService: ValidationsService, private modals: ModalsService, private storage: StorageService, private formBuilder: FormBuilder, private equipoService: EquipoService) { }

  ngOnInit() {
    (async () => {
      await this.getGenders();
      await this.getAgeAverage();
      await this.getDeports();
    })();
  }

  async getGenders() {
    await this.equipoService.getGender().subscribe((genders) => {
      this.genders.push(...genders);
    });
  }

  async getAgeAverage() {
    await this.equipoService.getAgeAverage().subscribe((ageAverage) => {
      this.AgeAverage.push(...ageAverage);
    });
  }

  async getDeports() {
    await this.equipoService.getDeports().subscribe((deports) => {
      this.deports.push(...deports);
    });
  }

  async getRegisterTeam() {
    const { nombre, edad, genero, deporte, tipo, descripcion } = this.formRegistroEquipo.value;

    const data = {
      "IdUsuarioCreador": this.storage.userProfile.IdUsuario,
      "IdTipoUsuario": 3,
      "NombreEquipo": nombre,
      "IdGenero": genero,
      "Descripcion": descripcion,
      "IdTipoEquipo": tipo,
      "IdEdadPromedio": edad,
      "IdDeporte": deporte.IdDeporte
    };

    this.alertsService.present('Cargando...');

    const valid = await this.equipoService.getRegisterTeam(data);

    this.alertsService.dismiss();

    if (valid) {
      await this.modals.getshowModalOptionRouter('style-icon-success', '¡Felicidades! Tu equipo', 'fue creado con éxito.', 'Puedes acceder a él en la pantalla de INICIO', '', 'dashboard/profile');
    } else {
      await this.modals.getshowModalOption('style-icon-error', 'Lo sentimos', '', 'el nombre que ingresaste', ' fue recientemente utilizado');
    }

  }



}
