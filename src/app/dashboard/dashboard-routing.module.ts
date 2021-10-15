import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'team/search-team',
        loadChildren: () => import('./pages/team/buscador-equipos/buscador-equipos.module').then(m => m.BuscadorEquiposPageModule)
      },
      {
        path: 'team/create-team',
        loadChildren: () => import('./pages/team/crear-equipo/crear-equipo.module').then(m => m.CrearEquipoPageModule)
      },
      {
        path: 'team/invite-players/:id',
        loadChildren: () => import('./pages/team/invitar-jugadores/invitar-jugadores.module').then(m => m.InvitarJugadoresPageModule)
      },
      {
        path: 'team/profile-team',
        loadChildren: () => import('./pages/team/administrar-equipo/administrar-equipo.module').then(m => m.AdministrarEquipoPageModule)
      },
      {
        path: 'team/user-team',
        loadChildren: () => import('./pages/team/mis-equipos/mis-equipos.module').then(m => m.MisEquiposPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/user/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'profile-user',
        loadChildren: () => import('./pages/user/perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioPageModule)
      },

      {
        path: '**',
        redirectTo: 'profile',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
