import { Component } from '@angular/core';
import { LlistaPageComponent } from './pages/llista-page/llista-page.component';

@Component({
  imports: [LlistaPageComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public nomApp = 'lista-tares';
}