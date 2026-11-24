## Contracte API vs Model Intern

| Camp API (`TascaApiResponse`) | Tipus API | Camp Intern (`ElementTasca`) | Tipus Intern | Transformació / Valor per defecte |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `number \| string` | `id` | `string` | Conversió a `string` i `.trim()` |
| `titol` | `string` | `nom` | `string` | `.trim()`, per defecte `'Tasca sense títol'` |
| `descripcioBreu` | `string` | `descripcio` | `string` | `.trim()`, per defecte `'Sense descripció'` |
| `categoria` | `string` | `categoria` | `string` | `.trim()`, per defecte `'General'` |
| `dataLimit` | `string \| Date` | `dataLimit` | `Date` | Conversió segura a `Date` (`2026-12-31` si és invàlida) |
| *(intern)* | — | `estat` | `EstatTasca` | Valor inicial `'Pendent'` |
| `horesEstimades` | `number \| string` | `horesEstimades` | `number` | Conversió numèrica segura (`>= 0`, per defecte `1`) |
| `es_important` | `boolean` | `esImportant` | `boolean` | Comparació estricta `=== true` |

## Altres models
- **`EstatTasques`:** `{ estat: 'inicial' | 'carregant' | 'exit' | 'error'; tasques: ElementTasca[]; error?: string }`
- **`CercaDesada`:** `{ terme: string; categoria: string; data: string }`