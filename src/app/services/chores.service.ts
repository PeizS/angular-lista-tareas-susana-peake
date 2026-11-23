import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tasca } from '../models/tasca.model';

@Injectable({
  providedIn: 'root',
})
export class Chores {
  // Aquí inyectamos HttpClient con la función inject()
  private http = inject(HttpClient);

  // URL del endpoint a partir de la URL base definida en environment.ts
  private apiUrl = `${environment.apiUrl}/tasques`;

  // Estado de carga gestionado desde el servicio
  public carregant = false;

  public obtenirTasques(): Observable<Tasca[]> {
    this.carregant = true;

    return this.http.get<Tasca[]>(this.apiUrl).pipe(
      finalize(() => {
        this.carregant = false;
      })
    );
  }
}