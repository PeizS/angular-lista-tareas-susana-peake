import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, Subject, catchError, map, of, switchMap, tap } from 'rxjs';

import { adaptarTascaApi, adaptarTasquesApi } from '../adaptadors/tasca.adaptador';
import { TascaApiResponse } from '../models/tasca-api.model';
import { ElementTasca, EstatTasques } from '../models/element.model';
import { environment } from '../../environments/environment';

export interface CriterisCerca {
  terme: string;
  categoria: string;
}

export interface NovaTascaApi {
  titol: string;
  descripcioBreu?: string;
  categoria?: string;
  dataLimit?: string | Date;
  horesEstimades?: number;
  es_important?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Chores {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tareas`;

  private readonly criterisInicials: CriterisCerca = { terme: '', categoria: '' };
  private readonly criteris$ = new Subject<CriterisCerca>();
  private darrersCriteris: CriterisCerca = this.criterisInicials;

  private readonly estatSignal = signal<EstatTasques>({
    estat: 'inicial',
    tasques: [],
    error: undefined,
  });
  readonly estat = this.estatSignal.asReadonly();

  constructor() {
    this.criteris$
      .pipe(
        tap((criteris) => {
          this.darrersCriteris = criteris;
          this.estatSignal.set({
            estat: 'carregant',
            tasques: [],
            error: undefined,
          });
        }),
        switchMap((criteris) =>
          this.obtenirTasquesFiltrades(criteris).pipe(
            map((tasques): EstatTasques => ({
              estat: 'exit',
              tasques,
              error: undefined,
            })),
            catchError((error: HttpErrorResponse) =>
              of<EstatTasques>({
                estat: 'error',
                tasques: [],
                error: this.gestionarError(error),
              })
            )
          )
        )
      )
      .subscribe((nouEstat) => this.estatSignal.set(nouEstat));
  }

  carregarTot(): void {
    this.cercar(this.criterisInicials);
  }

  cercar(criteris: CriterisCerca): void {
    this.criteris$.next({
      terme: criteris.terme.trim(),
      categoria: criteris.categoria,
    });
  }

  reintentar(): void {
    this.criteris$.next(this.darrersCriteris);
  }

  crearTasca(nova: NovaTascaApi): Observable<ElementTasca> {
    return this.http.post<TascaApiResponse>(this.apiUrl, nova).pipe(
      map(adaptarTascaApi),
      tap(() => this.reintentar())
    );
  }

  private obtenirTasquesFiltrades(criteris: CriterisCerca): Observable<ElementTasca[]> {
    let params = new HttpParams();
    if (criteris.categoria && criteris.categoria !== 'Totes') {
      params = params.set('categoria', criteris.categoria);
    }

    return this.http.get<TascaApiResponse[]>(this.apiUrl, { params }).pipe(
      map(adaptarTasquesApi),
      map((tasques) => this.filtrarPerTerme(tasques, criteris.terme))
    );
  }

  private filtrarPerTerme(tasques: ElementTasca[], terme: string): ElementTasca[] {
    const text = terme.trim().toLocaleLowerCase('ca');
    if (text.length < 3) {
      return tasques;
    }
    return tasques.filter((tasca) =>
      `${tasca.nom} ${tasca.descripcio}`.toLocaleLowerCase('ca').includes(text)
    );
  }

  private gestionarError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return "No es pot connectar amb l'API. Comproveu que npm run api està actiu al port 4301.";
      case 404:
        return "Recurs /tareas no trobat. Verifiqueu la URL de l'API.";
      case 500:
        return 'Error intern del servidor.';
      default:
        return `Error inesperat (${error.status}): ${error.message}`;
    }
  }}