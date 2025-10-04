import { Routes } from '@angular/router';
import { AlumnosComponent } from './componentes/alumnos/alumnos.component';
import { CarreraComponent } from './componentes/carrera/carrera.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

export const routes: Routes = [
  { 
    path: '', 
    component: InicioComponent,  //página principal
    title: 'Inicio'
  },
  { 
    path: 'inicio', 
    redirectTo: '',  
    pathMatch: 'full'
  },
  { 
    path: 'alumnos', 
    component: AlumnosComponent,
    title: 'Gestión de Alumnos'
  },
  {
    path: 'carrera', 
    component: CarreraComponent, 
    title: 'Gestión de Carreras'
  },
  { 
    path: '**', 
    redirectTo: ''  
  }
];