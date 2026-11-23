import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaTareas } from './components/lista-tareas/lista-tareas.component';

@Component({
  imports: [RouterOutlet,ListaTareas],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {
  //protected readonly title = signal('ioc-angular-lista-tareas-susana-peake');
  public nomApp= 'lista-tareas'; //nom aplicacio
}
