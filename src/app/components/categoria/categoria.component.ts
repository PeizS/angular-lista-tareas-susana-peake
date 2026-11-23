import { Component,Input} from '@angular/core';
import { Tasca } from '../../models/tasca.model';

@Component({
  imports: [],
  selector: 'app-categoria',
  styleUrl: './categoria.component.scss',
  templateUrl: './categoria.component.html',
})
export class Categoria {
  @Input() categoria: string='General';
}
