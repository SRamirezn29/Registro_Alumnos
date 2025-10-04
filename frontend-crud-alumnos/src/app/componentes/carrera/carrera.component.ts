import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Carrera {
  id: number;
  nombre: string;
  codigo: string;
  duracion: number;
}

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent {
  carreras: Carrera[] = [];
  
  nuevaCarrera: Carrera = {
    id: 0,
    nombre: '',
    codigo: '',
    duracion: 0
  };

  carreraSeleccionada: Carrera | null = null;

  ngOnInit() {
    this.cargarCarreras();
  }

  cargarCarreras() {
    const datosGuardados = localStorage.getItem('carreras');
    if (datosGuardados) {
      this.carreras = JSON.parse(datosGuardados);
    }
  }

  guardarEnLocalStorage() {
    localStorage.setItem('carreras', JSON.stringify(this.carreras));
  }

  guardarCarrera() {
    if (this.carreraSeleccionada) {
      const index = this.carreras.findIndex(c => c.id === this.carreraSeleccionada!.id);
      this.carreras[index] = { ...this.nuevaCarrera };
    } else {
      this.nuevaCarrera.id = Date.now();
      this.carreras.push({ ...this.nuevaCarrera });
    }
    
    this.guardarEnLocalStorage();
    this.limpiarFormulario();
  }

  editarCarrera(carrera: Carrera) {
    this.carreraSeleccionada = carrera;
    this.nuevaCarrera = { ...carrera };
  }

  eliminarCarrera(id: number) {
    if (confirm('¿Estás seguro de eliminar esta carrera?')) {
      this.carreras = this.carreras.filter(c => c.id !== id);
      this.guardarEnLocalStorage();
    }
  }

  cancelarEdicion() {
    this.limpiarFormulario();
  }

  private limpiarFormulario() {
    this.nuevaCarrera = {
      id: 0,
      nombre: '',
      codigo: '',
      duracion: 0
    };
    this.carreraSeleccionada = null;
  }
}