import { Component,Input } from '@angular/core';
import { Tasca } from '../../models/tasca.model';
import { Categoria } from '../categoria/categoria.component';
import { ElementTasca } from '../../models/element.model';

@Component({
  imports: [Categoria],
  selector: 'app-tarjeta-tarea',
  styleUrl: './tarjeta-tarea.component.scss',
  templateUrl: './tarjeta-tarea.component.html',
})
export class TarjetaTarea {
  // @Input() s'encarrega de capturar la tasca que li envia el component pare
  @Input() tasca!:ElementTasca;
}
