# Mapatge de models: API -> Model intern
- **Model API:** `src/app/models/tasca-api.model.ts`
- **Model intern:** `src/app/models/element.model.ts`
- **Adaptador:** `src/app/adaptadors/tasca.adaptador.ts`

| Camp API (`TascaApiResponse`) | Camp model intern (`ElementTasca`) | Transformació / Normalització aplicada |
| --- | --- | --- |
| `id` | `id` | Conversió a `string` i neteja d'espais amb `.trim()`. |
| `nom` | `nom` | `.trim()`; si queda buit o no ve, valor per defecte `'Tasca sense títol'`. |
| `descripcio` | `descripcio` | `.trim()`; si falta o és buida, valor per defecte `'Sense descripció'`. |
| `categoria` | `categoria` | `.trim()`; si falta o és buida, valor per defecte `'General'`. |
| `dataLimit` | `dataLimit` | Conversió segura a objecte `Date` (amb data per defecte si no és vàlida). |
| `estat` | `estat` | Assignació d'estat per defecte `'Pendent'` al model intern. |
| `horesEstimades` | `horesEstimades` | Conversió numèrica segura (`Number(...)`); si no és un número vàlid o és `< 0`, assigna `1`. |
| `Important` | `esImportant` | Conversió a booleà (`=== true`), per defecte `false`. |