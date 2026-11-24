import { Component,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaTarea } from '../tarjeta-tarea/tarjeta-tarea.component';
import { FiltroTareas,FiltresTasca } from '../filtro-tareas/filtro-tareas.component';
import { ElementTasca } from '../../models/element.model';
import { Chores } from '../../services/chores.service';

@Component({
  imports: [TarjetaTarea,FiltroTareas,CommonModule],
  selector: 'app-lista-tareas',
  styleUrl: './lista-tareas.component.scss',
  templateUrl: './lista-tareas.component.html',
})
export class ListaTareas implements OnInit{
  //array con todass las tareas
  public tasques: ElementTasca[] = [];

  //array que se muestra por defecto
  public tasquesFiltrades: ElementTasca[] = [];

  //Variable per mostrar tasca seleccionada
  public tascaSeleccionada: ElementTasca | null = null;
  //servicio
  private choresService = inject(Chores);

  ngOnInit(): void {
    this.choresService.obtenirTasques().subscribe({
      next: (dadesAdaptades) => {
        this.tasques = dadesAdaptades;
        this.tasquesFiltrades = dadesAdaptades;
      },
      error: (err) => {
        console.error('Error carregant tasques:', err);
      },
    });
  }
  
  public seleccionarTasca(tasca: ElementTasca): void {
    this.tascaSeleccionada = tasca;
  }


  // Función que recibe el objeto con el texto y la categoría del hijo
  public aplicarFiltres(filtres: FiltresTasca) {
    console.log("Filtres rebuts:", filtres);

    this.tasquesFiltrades = this.tasques.filter(t => {
      // 1. Comprova si el títol conté el text buscat (si s'ha escrit)
      const coincideixText = filtres.text 
        ? t.nom.toLowerCase().includes(filtres.text.toLowerCase()) 
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
