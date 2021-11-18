import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrarTipoRolePageRoutingModule } from './administrar-tipo-role-routing.module';

import { AdministrarTipoRolePage } from './administrar-tipo-role.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrarTipoRolePageRoutingModule
  ],
  declarations: [AdministrarTipoRolePage]
})
export class AdministrarTipoRolePageModule {}
