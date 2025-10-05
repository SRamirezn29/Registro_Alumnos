import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnosService } from '../../alumnos.service';

@Component({
  selector: 'app-agregar-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-alumno.component.html',
  styleUrl: './agregar-alumno.component.css'
})
export class AgregarAlumnoComponent {
  alumno: any = {
    nombre: '',
    apellido: '',
    email: '',
    documento: '',
    fecha_nacimiento: '', // usa <input type="date">
    telefono: ''
  };

  cargando = false;

  constructor(
    private alumnosService: AlumnosService,
    private router: Router
  ) {}

  /** Enviar al backend (POST) */
  guardar(): void {
    // Validación mínima (ajusta a tus reglas)
    if (!this.alumno.nombre || !this.alumno.apellido || !this.alumno.documento) {
      alert('Nombre, Apellido y Documento son obligatorios');
      return;
    }

    this.cargando = true;
    this.alumnosService.crearAlumno(this.alumno).subscribe({
      next: (res) => {
        alert(res.message || 'Alumno creado correctamente');
        this.router.navigate(['/listar-alumno']);
      },
      error: (err) => {
        console.error(err);
        alert(err?.error?.error || 'No se pudo crear el alumno');
      },
      complete: () => (this.cargando = false),
    });
  }
}
