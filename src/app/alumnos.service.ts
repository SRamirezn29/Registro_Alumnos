import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiUrl = 'http://localhost/Registro_Alumnos-main/backend/alumnos.php'; 
  // Ajusta la ruta a donde estén tus PHP

  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // Obtener todos los alumnos
  obtenerAlumnos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener un alumno por ID
  obtenerAlumnoPorId(id_alumno: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?id_alumno=${id_alumno}`);
  }

  // >>> AGREGAR alumno (POST)
  crearAlumno(alumno: any): Observable<any> {
    return this.http.post(this.apiUrl, alumno, { headers: this.jsonHeaders });
  }

  // Editar un alumno existente (PUT)
  editarAlumno(alumno: any): Observable<any> {
    return this.http.put(this.apiUrl, alumno, { headers: this.jsonHeaders });
  }

  // Eliminar un alumno (DELETE con body)
  eliminarAlumno(id_alumno: number): Observable<any> {
    return this.http.delete(this.apiUrl, {
      body: { id_alumno },
      headers: this.jsonHeaders
    });
  }
}
