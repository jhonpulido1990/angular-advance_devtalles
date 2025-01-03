import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { autGuard } from '../guards/aut.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [autGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dasboard' } },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'ProgressBar' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { titulo: 'Grafica #1' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { titulo: 'Perfil de Usuario' },
      },
      // mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: { titulo: 'Perfil de usuario' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}

