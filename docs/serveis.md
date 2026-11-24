# Documentació de Serveis

## 1. Servei `Chores` (`src/app/services/chores.service.ts`)
Gestiona la comunicació HTTP amb `http://localhost:4301/tareas` i l'estat reactiu del llistat.

- **Estat reactiu (`signal`):** Exposa `readonly estat` de tipus `EstatTasques` amb les quatre fases: `inicial`, `carregant`, `exit` i `error`.
- **Flux amb `switchMap`:** Al constructor, un `Subject<CriterisCerca>` (`criteris$`) passa a estat `carregant`, desa `darrersCriteris` i encadena amb `switchMap` la petició `GET` (`obtenirTasquesFiltrades`), cancel·lant o ignorant peticions anteriors si l'usuari llança una cerca nova abans que acabi l'anterior.
- **Mètodes principals:**
  - `carregarTot()` / `cercar(criteris)`: emeten criteris al flux reactiu (`GET /tareas` amb `HttpParams` per categoria i filtratge local per terme a partir de 3 caràcters).
  - `crearTasca(nova)`: envia un `POST /tareas`, adapta la resposta amb `adaptarTascaApi` i crida `reintentar()` per refrescar la llista.
  - `comptarResultats(terme)`: consulta `/tareas`, adapta els resultats i retorna un `Observable<number>` per al validador asíncron.
  - `reintentar()`: torna a emetre `darrersCriteris` a `criteris$` per recuperar la vista després d'un error.

## 2. Servei `HistorialCerquesService` (`src/app/services/historial-cerques.service.ts`)
- Manté les darreres cerques confirmades (màxim 8) en un `signal` sincronitzat amb `localStorage` sota la clau `'cataleg-historial-cerques'`.
- Evita duplicats consecutius comparant la nova cerca amb `historialSignal()[0]`.
- Encapsula `getItem`/`JSON.parse` i `setItem` dins de blocs `try/catch`.