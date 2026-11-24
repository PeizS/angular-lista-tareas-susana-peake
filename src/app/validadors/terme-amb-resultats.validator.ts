import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';
import { Chores } from '../services/chores.service';

export function termeAmbResultatsValidator(choresService: Chores): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const terme = (control.value ?? '').toString().trim();

    if (terme.length < 3) {
      return of(null);
    }

    return timer(400).pipe(
      switchMap(() => choresService.comptarResultats(terme)),
      map((total) => (total > 0 ? null : { senseResultats: true })),
      catchError(() => of(null))
    );
  };
}