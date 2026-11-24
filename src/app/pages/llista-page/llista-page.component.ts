import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chores } from '../../services/chores.service';
import { ElementTasca } from '../../models/element.model';

@Component({
  imports: [DatePipe],
  selector: 'app-llista-page',
  styleUrl: './llista-page.component.scss',
  templateUrl: './llista-page.component.html',
})
export class LlistaPageComponent implements OnInit {
  readonly choresService = inject(Chores);
  tascaSeleccionada: ElementTasca | null = null;

  ngOnInit(): void {
    this.choresService.carregarTot();
  }

  reintentar(): void {
    this.choresService.reintentar();
  }

  seleccionarTasca(tasca: ElementTasca): void {
    this.tascaSeleccionada = tasca;
  }
}
