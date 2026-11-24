Documentació de Formularis i Validacions

## Component `FormulariCercaComponent` (`src/app/components/formulari-cerca/`)
Formulari reactiu (`FormGroup` amb controls `nonNullable`) que emet els criteris validats cap al component contenidor `LlistaPageComponent` mitjançant `@Output() cercaEnviada`.

### Controls i validacions
1. **`terme` (`FormControl<string>`):**
   - **Validació síncrona:** `Validators.minLength(3)`.
   - **Validació asíncrona:** `termeAmbResultatsValidator(choresService)` (`src/app/validadors/terme-amb-resultats.validator.ts`). Si el terme té menys de 3 caràcters retorna `of(null)`. En cas contrari, aplica `timer(400)` (debounce) i consulta `choresService.comptarResultats(terme)` amb `switchMap`. Si `total === 0`, retorna `{ senseResultats: true }`; si hi ha error de xarxa, retorna `of(null)` per no bloquejar el formulari.
   - **Visualització d'errors:** Només es mostren quan `terme.invalid && (terme.dirty || terme.touched)`.
2. **`categoria` (`FormControl<string>`):** Selector de categoria amb opció buida per defecte (`Totes les categories`).

### Historial i accions
- **Enviar (`enviar()`):** Marca els controls com a tocats si és invàlid; si és vàlid, desa la cerca a `HistorialCerquesService` i emet els criteris.
- **Recuperar (`recuperar(cerca)`):** Omple el formulari amb `patchValue` i torna a llançar la cerca.
- **Netejar (`netejar()`):** Reinicia el formulari (`reset()`) i emet els criteris buits per restaurar tot el llistat.