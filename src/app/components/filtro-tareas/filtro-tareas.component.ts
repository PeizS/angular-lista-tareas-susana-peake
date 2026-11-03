import { Component,output,EventEmitter, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-filtro-tareas',
  styleUrl: './filtro-tareas.component.scss',
  templateUrl: './filtro-tareas.component.html',
})
export class FiltroTareas {
  @Output() categoriaSeleccionada= new EventEmitter<string>();

  public filtrar(opcio:string){
    this.categoriaSeleccionada.emit(opcio);
  }
}
