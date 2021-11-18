import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscadorEquiposPageRoutingModule } from './buscador-equipos-routing.module';

import { BuscadorEquiposPage } from './buscador-equipos.page';
import { FiltroBuscadorPage } from '../filtro-buscador/filtro-buscador.page';
import { DetalleEquipoPage } from '../detalle-equipo/detalle-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BuscadorEquiposPageRoutingModule
  ],
  declarations: [BuscadorEquiposPage, DetalleEquipoPage, FiltroBuscadorPage],
  entryComponents: [
    DetalleEquipoPage,
    FiltroBuscadorPage
  ]
})
export class BuscadorEquiposPageModule { }
