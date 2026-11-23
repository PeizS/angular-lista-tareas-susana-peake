import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tasca } from '../../models/tasca.model';
import { TAREAS_MOCK } from '../../models/tareas.mock';
import { TarjetaTarea } from '../tarjeta-tarea/tarjeta-tarea.component';
import { FiltroTareas,FiltresTasca } from '../filtro-tareas/filtro-tareas.component';

@Component({
  imports: [TarjetaTarea,FiltroTareas,CommonModule],
  selector: 'app-lista-tareas',
  styleUrl: './lista-tareas.component.scss',
  templateUrl: './lista-tareas.component.html',
})
export class ListaTareas {
  //array con todass las tareas
  public tasques: Tasca[] = TAREAS_MOCK;

  //array que se muestra por defecto
  public tasquesFiltrades: Tasca[] = TAREAS_MOCK;

  //Variable per mostrar tasca seleccionada
  public tascaSeleccionada: Tasca | null = null;
  
  public seleccionarTasca(tasca: Tasca): void {
    this.tascaSeleccionada = tasca;
  }


  // Función que recibe el objeto con el texto y la categoría del hijo
  public aplicarFiltres(filtres: FiltresTasca) {
    console.log("Filtres rebuts:", filtres);

    this.tasquesFiltrades = this.tasques.filter(t => {
      // 1. Comprova si el títol conté el text buscat (si s'ha escrit)
      const coincideixText = filtres.text 
        ? t.titol.toLowerCase().includes(filtres.text.toLowerCase()) 
        : true;

      // 2. Comprova si coincideix amb la categoria seleccionada (o si és 'Totes')
      const coincideixCategoria = filtres.categoria === 'Totes' 
        ? true 
        : t.categoria === filtres.categoria;

      // Ha de complir les dues condicions a la vegada
      return coincideixText && coincideixCategoria;
    });
  }
}
