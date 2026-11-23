import { Component,output,EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Definim la interfície dels filtres que s'enviaran al pare
export interface FiltresTasca {
  text: string;
  categoria: string;
}

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-filtro-tareas',
  styleUrl: './filtro-tareas.component.scss',
  templateUrl: './filtro-tareas.component.html',
})
export class FiltroTareas {
  @Output() filtresCanviats= new EventEmitter<FiltresTasca>();

  // Llista de categories disponibles per al selector
  categories: string[] = ['Totes', 'Ocio', 'Professional', 'Hogar', 'Estudios'];

  // Model de dades del formulari
  filtres: FiltresTasca = {
    text: '',
    categoria: 'Totes'
  };

  // Mètode que s'executa en enviar el formulari (si és vàlid)
  public aplicaFiltres(): void {
    this.filtresCanviats.emit({ ...this.filtres });
  }

  // Mètode per restablir els filtres als valors per defecte
  public restableixFiltres(): void {
    this.filtres = {
      text: '',
      categoria: 'Totes'
    };
    this.aplicaFiltres();
  }
}
