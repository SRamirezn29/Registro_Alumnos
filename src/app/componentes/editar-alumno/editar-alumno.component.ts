import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../../alumnos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-alumno.component.html',
  styleUrl: './editar-alumno.component.css'
})
export class EditarAlumnoComponent implements OnInit{
   alumno: any = {
    id_alumno: 0,
    nombre: '',
    apellido: '',
    email: '',
    documento: '',
    fecha_nacimiento: '',
    telefono: ''
  };

   constructor(
    private alumnosService: AlumnosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.alumnosService.obtenerAlumnoPorId(+id).subscribe((data: any) => {
        this.alumno = data;
      });
  }
}
  guardarCambios(): void {
    this.alumnosService.editarAlumno(this.alumno).subscribe((res: any) => {
      alert(res.message || res.error);
      this.router.navigate(['/listar-alumno']);
    });
  }
}