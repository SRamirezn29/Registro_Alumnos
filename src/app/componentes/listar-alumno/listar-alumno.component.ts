import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../alumnos.service';

@Component({
  selector: 'app-listar-alumno',
  standalone: true,
  imports: [],
  templateUrl: './listar-alumno.component.html',
  styleUrl: './listar-alumno.component.css'
})
export class ListarAlumnoComponent implements OnInit {
  alumnos: any[] = [];

  constructor(private alumnosService: AlumnosService) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }
   cargarAlumnos(): void {
    this.alumnosService.obtenerAlumnos().subscribe((data: any) => {
      this.alumnos = data;
    });
  }
  eliminarAlumno(id_alumno: number): void {
    if (confirm('¿Seguro que deseas eliminar este alumno?')) {
      this.alumnosService.eliminarAlumno(id_alumno).subscribe((res: any) => {
        alert(res.message || res.error);
        this.cargarAlumnos();
      });
    }
  }
}

