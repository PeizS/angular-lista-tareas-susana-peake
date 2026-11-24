import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize,map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TascaApiResponse } from '../models/tasca-api.model';
import { ElementTasca } from '../models/element.model';
import { adaptarTasquesApi } from '../adaptadors/tasca.adaptador';

@Injectable({
  providedIn: 'root',
})
export class Chores {
  // Aquí inyectamos HttpClient con la función inject()
  private http = inject(HttpClient);

  // URL del endpoint a partir de la URL base definida en environment.ts
  private apiUrl = `${environment.apiUrl}/tareas`;

  // Estado de carga gestionado desde el servicio
  public carregant = false;

  public obtenirTasques(): Observable<ElementTasca[]> {
    this.carregant = true;

    return this.http.get<TascaApiResponse[]>(this.apiUrl).pipe(
      map((respostaApi) => adaptarTasquesApi(respostaApi)),
      finalize(() => {
        this.carregant = false;
      })
    );
  }
}