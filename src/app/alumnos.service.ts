import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiUrl = 'http://localhost/Registro_Alumnos-main/backend/alumnos.php'; 
  // Cambiar la ruta a donde esten los archivos PHP

  constructor(private http: HttpClient) {}

  // Obtener todos los alumnos
  obtenerAlumnos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener un alumno por ID
  obtenerAlumnoPorId(id_alumno: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?id_alumno=${id_alumno}`);
  }

  // Editar un alumno existente
  editarAlumno(alumno: any): Observable<any> {
    return this.http.put(this.apiUrl, alumno);
  }

  // Eliminar un alumno
  eliminarAlumno(id_alumno: number): Observable<any> {
    return this.http.delete(this.apiUrl, { body: { id_alumno } });
  }
}
