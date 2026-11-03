import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroTareas } from './filtro-tareas.component';

describe('FiltroTareas', () => {
  let component: FiltroTareas;
  let fixture: ComponentFixture<FiltroTareas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroTareas],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroTareas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
