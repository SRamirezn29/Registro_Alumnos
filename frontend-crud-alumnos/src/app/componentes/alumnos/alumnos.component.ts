import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  carrera: string;
  semestre: number;
  indice_academico: number;
}

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ AGREGAR ESTOS IMPORTS
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  // ✅ PROPIEDADES DEFINIDAS
  alumnos: Alumno[] = [];
  
  nuevoAlumno: Alumno = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    carrera: '',
    semestre: 0,
    indice_academico: 0
  };

  alumnoSeleccionado: Alumno | null = null;

  ngOnInit() {
    this.cargarAlumnos();
  }

  // ✅ MÉTODO PARA CARGAR ALUMNOS
  cargarAlumnos() {
    const datosGuardados = localStorage.getItem('alumnos');
    if (datosGuardados) {
      this.alumnos = JSON.parse(datosGuardados);
    }
  }

  // ✅ MÉTODO PARA GUARDAR EN LOCALSTORAGE
  guardarEnLocalStorage() {
    localStorage.setItem('alumnos', JSON.stringify(this.alumnos));
  }

  // ✅ MÉTODO PARA GUARDAR ALUMNO
  guardarAlumno() {
    if (this.alumnoSeleccionado) {
      // Editar alumno existente
      const index = this.alumnos.findIndex(a => a.id === this.alumnoSeleccionado!.id);
      this.alumnos[index] = { ...this.nuevoAlumno };
    } else {
      // Agregar nuevo alumno
      this.nuevoAlumno.id = Date.now();
      this.alumnos.push({ ...this.nuevoAlumno });
    }
    
    this.guardarEnLocalStorage();
    this.limpiarFormulario();
  }

  // ✅ MÉTODO PARA EDITAR ALUMNO
  editarAlumno(alumno: Alumno) {
    this.alumnoSeleccionado = alumno;
    this.nuevoAlumno = { ...alumno };
  }

  // ✅ MÉTODO PARA ELIMINAR ALUMNO
  eliminarAlumno(id: number) {
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
      this.alumnos = this.alumnos.filter(a => a.id !== id);
      this.guardarEnLocalStorage();
    }
  }

  // ✅ MÉTODO PARA CANCELAR EDICIÓN
  cancelarEdicion() {
    this.limpiarFormulario();
  }

  // ✅ MÉTODO PARA OBTENER CLASE DEL ÍNDICE
  getClaseIndice(indice: number): string {
    if (indice >= 4.0) return 'bg-success';
    if (indice >= 3.0) return 'bg-warning text-dark';
    return 'bg-danger';
  }

  // ✅ MÉTODO PRIVADO PARA LIMPIAR FORMULARIO
  private limpiarFormulario() {
    this.nuevoAlumno = {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
      carrera: '',
      semestre: 0,
      indice_academico: 0
    };
    this.alumnoSeleccionado = null;
  }
}