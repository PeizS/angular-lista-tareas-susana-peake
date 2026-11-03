import { Component } from '@angular/core';
import { Tasca } from '../../models/tasca.model';
import { TAREAS_MOCK } from '../../models/tareas.mock';
import { TarjetaTarea } from '../tarjeta-tarea/tarjeta-tarea.component';
import { FiltroTareas } from '../filtro-tareas/filtro-tareas.component';

@Component({
  imports: [TarjetaTarea,FiltroTareas],
  selector: 'app-lista-tareas',
  styleUrl: './lista-tareas.component.scss',
  templateUrl: './lista-tareas.component.html',
})
export class ListaTareas {
  //array con todass las tareas
  public tasques: Tasca[] = TAREAS_MOCK;

  //array que se muestra por defecto
  public tasquesFiltrades: Tasca[] = TAREAS_MOCK;

  //funcion para el boton de filtrado
  public filtrarPerImportancia(filtre: any) {
    console.log("s'ha clickat el filtre");
    if (filtre === 'totes') {
      this.tasquesFiltrades = this.tasques; // Si es 'totes', devolvemos la lista entera
    } else if (filtre === 'urgent' || filtre === 'important') {
      // Si cliquen "Importants", filtrem només les que tenen es_important a true
      this.tasquesFiltrades = this.tasques.filter(t => t.es_important === true);
    }
  }
}
