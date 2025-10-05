import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlumnosService } from './alumnos.service';

describe('AlumnosService', () => {
  let service: AlumnosService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost/Registro_Alumnos-main/backend/alumnos.php';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlumnosService]
    });
    service = TestBed.inject(AlumnosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // no queden requests pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('crearAlumno debe hacer POST a la API con el body correcto', () => {
    const payload = {
      nombre: 'Ana',
      apellido: 'López',
      documento: '0801-2001-12345',
      email: 'ana@ejemplo.com',
      fecha_nacimiento: '2001-05-21',
      telefono: '9999-9999'
    };

    const mockResponse = { message: 'Alumno creado correctamente', id_alumno: 123 };

    service.crearAlumno(payload).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponse);
  });
});
