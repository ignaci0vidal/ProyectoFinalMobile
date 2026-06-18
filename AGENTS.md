# AGENTS.md

Notas para trabajar en este proyecto con agentes de codigo.

## Proyecto

- App mobile/web hecha con Expo, React Native y TypeScript.
- Nombre funcional: miKitchen.
- Rama de trabajo actual: `codex/arreglos-review-proyecto`.
- Repo remoto: `ignaci0vidal/ProyectoFinalMobile`.
- Script de validacion agregado: `npm run typecheck`.

## Cambios realizados en esta rama

- Se corrigio el feedback haptico en recetas:
  - `notifySuccess` ya no se llama recursivamente.
  - Crear, editar, eliminar y marcar favoritas usan helpers con `try/catch`.
  - En web no se ejecutan haptics.

- Se agrego persistencia de usuarios:
  - `AuthContext` guarda usuarios en AsyncStorage.
  - Los usuarios registrados se mezclan con los usuarios demo iniciales.

- Se corrigieron imagenes que no cargaban en iPhone:
  - Algunos assets tenian contenido PNG pero extension `.jpg`.
  - Se renombraron a `.png`.
  - Se actualizaron los `require(...)` en `initialRecipes.ts`.
  - `RecipesContext` rehidrata imagenes locales actuales para recetas guardadas.

- Se mejoro el timer:
  - Se reemplazo el `Picker` nativo por un selector tipo rueda propio.
  - Android y web ya no abren menu desplegable.
  - El selector queda visualmente parecido al comportamiento de iPhone.
  - El texto del timer se ajusta para no romper layout con tiempos largos.

- Se mejoro el formulario de recetas:
  - `RecipeFormScreen` usa `KeyboardAvoidingView`.
  - El `ScrollView` tiene padding inferior extra.
  - `FormInput` acepta `onFocus`.
  - Al enfocar el campo "Preparacion", el formulario hace `scrollToEnd`.

- Se ajusto UI/tipado:
  - Logo del login responsive.
  - Navegacion de Home tipada sin `any`.
  - `RootTabParamList` acepta parametros del stack de recetas.

- Se hizo mas real la pantalla Ajustes:
  - Se redujeron cards informativas de presentacion.
  - Se agrego edicion de perfil desde un modal.
  - El usuario puede cambiar nombre, email y opcionalmente contraseña.
  - `AuthContext` expone `updateProfile` y persiste los cambios en AsyncStorage.
  - Se agrego una card "Proximamente" con chips para packs tematicos.
  - El pack "Salsas" quedo destacado y agrega 4 recetas al recetario desde un modal de confirmacion.

## Validacion

Ejecutado correctamente:

```bash
npm run typecheck
```

## GitHub

- Commit creado: `454e6f9 Arreglar persistencia y experiencia mobile`.
- Push realizado a `origin/codex/arreglos-review-proyecto`.
- No se pudo abrir PR automaticamente porque:
  - `gh` no esta instalado/en PATH.
  - El conector de GitHub devolvio `403 Resource not accessible by integration`.

Link para crear el PR:

```txt
https://github.com/ignaci0vidal/ProyectoFinalMobile/pull/new/codex/arreglos-review-proyecto
```

## Notas importantes

- No usar `git reset --hard` ni descartar cambios sin confirmacion.
- Si se prueban las imagenes en iPhone y siguen cacheadas, iniciar Expo con:

```bash
npx expo start -c
```

- Si se quiere eliminar la dependencia `@react-native-picker/picker`, revisar primero si ya no se usa en ningun otro archivo y actualizar `package-lock.json`.
