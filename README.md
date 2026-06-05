# Proyecto Final Mobile - miKitchen

Aplicación móvil desarrollada con **Expo**, **React Native** y **TypeScript** para gestionar recetas de cocina de manera local.

El proyecto fue realizado como trabajo final de la materia de desarrollo de aplicaciones móviles. La app permite registrar usuarios, iniciar sesión, crear recetas, visualizarlas, editarlas, eliminarlas, marcarlas como favoritas, cargar imágenes y conservar los datos localmente mediante persistencia en el dispositivo.

---

## Descripción general

La aplicación funciona como un recetario digital. Cada usuario puede acceder a sus propias recetas y administrarlas desde una interfaz simple, visual y adaptada tanto para uso en dispositivo móvil como en navegador.

El proyecto integra navegación por pestañas, navegación por stack, formularios, manejo de estado global, carga de imágenes, feedback háptico, timer de cocción y almacenamiento local.

---

## Funcionalidades principales

- Registro de usuario local.
- Inicio y cierre de sesión.
- Visualización de recetas por usuario.
- Creación de nuevas recetas.
- Visualización del detalle de cada receta.
- Edición de recetas existentes.
- Eliminación de recetas con modal de confirmación.
- Marcado y desmarcado de recetas favoritas.
- Pantalla específica para recetas favoritas.
- Carga de imagen desde galería.
- Carga de imagen usando cámara.
- Timer de cocción.
- Persistencia local de recetas con AsyncStorage.
- Compatibilidad probada en Expo Go para iPhone y en navegador web.

---

## Tecnologías utilizadas

- Expo
- React Native
- TypeScript
- React
- React Navigation
- Context API
- AsyncStorage
- Expo Image Picker
- Expo Haptics
- Expo AV
- Ionicons

---

## Estructura general del proyecto

```txt
ProyectoFinalMobile/
│
├── src/
│   │
│   ├── assets/
│   │   └── recipes/
│   │       └── Imágenes utilizadas para recetas precargadas
│   │
│   ├── components/
│   │   ├── EmptyState.tsx
│   │   ├── FormInput.tsx
│   │   ├── ItalianTableclothBackground.tsx
│   │   ├── PrimaryButton.tsx
│   │   └── RecipeCard.tsx
│   │
│   ├── data/
│   │   ├── AuthContext.tsx
│   │   ├── RecipesContext.tsx
│   │   └── initialRecipes.ts
│   │
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── types.tsx
│   │
│   ├── screens/
│   │   ├── CategoriesScreen.tsx
│   │   ├── FavoriteRecipesScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RecipeDetailScreen.tsx
│   │   ├── RecipeFormScreen.tsx
│   │   ├── RecipeListScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   └── TimerScreen.tsx
│   │
│   └── types/
│       └── recipe.ts
│
├── App.tsx
├── app.json
├── package.json
├── package-lock.json
└── README.md
```

---

## Organización del código

El proyecto está organizado separando responsabilidades:

### `components`

Contiene componentes reutilizables de la interfaz, como botones, inputs, tarjetas de recetas, fondos visuales y estados vacíos.

### `screens`

Contiene las pantallas principales de la app. Cada pantalla representa una vista funcional del proyecto, por ejemplo listado de recetas, detalle, formulario, favoritos, timer o ajustes.

### `data`

Contiene la lógica de estado global mediante Context API. En esta carpeta se manejan los usuarios, las recetas, los datos iniciales y la persistencia local.

### `navigation`

Contiene la configuración de navegación principal de la app. Se utiliza navegación por tabs para las secciones principales y navegación por stack para el flujo de recetas.

### `types`

Contiene tipos TypeScript compartidos, especialmente el tipo principal `Recipe`.

---

## Navegación

La app utiliza **React Navigation** con dos niveles principales:

### Navegación por tabs

Permite moverse entre las secciones principales:

- Inicio
- Recetas
- Timer
- Ajustes

### Navegación por stack

Dentro de la sección de recetas se utiliza un stack para navegar entre:

- Listado de recetas
- Recetas favoritas
- Detalle de receta
- Crear receta
- Editar receta
- Categorías

Esta estructura permite mantener una navegación ordenada y separar el flujo principal del flujo específico de recetas.

---

## CRUD de recetas

La app implementa un CRUD completo sobre recetas.

### Crear

El usuario puede crear una receta cargando:

- Título
- Categoría
- Descripción
- Tiempo de cocción
- Imagen
- Ingredientes
- Pasos de preparación

### Leer

Las recetas se visualizan desde el listado principal y pueden abrirse en una pantalla de detalle.

### Editar

Desde el detalle de una receta se puede acceder a la pantalla de edición. El formulario se reutiliza tanto para crear como para editar, diferenciando el comportamiento mediante un modo interno.

### Eliminar

La eliminación se realiza desde el detalle de la receta mediante un modal de confirmación. Esto evita eliminaciones accidentales y mejora la compatibilidad entre mobile y web.

---

## Persistencia local

Las recetas se almacenan localmente utilizando **AsyncStorage**.

Esto permite que las recetas creadas, editadas o eliminadas se conserven aunque se cierre la app o se reinicie Expo Go.

La persistencia es local por dispositivo. Esto significa que los datos guardados en un celular no se sincronizan automáticamente con otro celular o navegador.

Para sincronización entre dispositivos sería necesario incorporar un backend, una base de datos remota o un servicio externo como Firebase o Supabase.

---

## Manejo de usuarios

La app cuenta con registro e inicio de sesión local.

Cada receta queda asociada al usuario que la creó. De esta manera, al iniciar sesión con distintos usuarios, cada uno puede ver únicamente sus propias recetas.

La autenticación fue implementada con fines académicos y funciona de manera local dentro de la aplicación.

---

## Compatibilidad mobile y web

La app fue probada en:

- Expo Go en iPhone.
- Navegador web desde PC.

Durante el desarrollo se ajustaron diferencias entre mobile y web. Por ejemplo, `expo-haptics` se utiliza en dispositivos compatibles, pero se evita bloquear acciones en navegador cuando el feedback háptico no está disponible.

---

## Uso de imágenes

La app permite cargar imágenes en recetas mediante:

- Galería del dispositivo.
- Cámara del dispositivo.

Para esto se utiliza **Expo Image Picker**.

Las recetas precargadas también pueden utilizar imágenes locales almacenadas dentro de la carpeta de assets.

---

## Timer de cocción

El proyecto incluye una pantalla de timer que permite controlar tiempos de cocción.

Esta funcionalidad complementa el objetivo principal del recetario, ya que permite usar la app como apoyo durante la preparación de recetas.

---

## Uso de inteligencia artificial

Durante el desarrollo del proyecto se utilizó inteligencia artificial, ChatGPT, como herramienta de apoyo para analizar errores, organizar tareas, revisar fragmentos de código y proponer mejoras de implementación.

El uso de IA estuvo orientado principalmente a:

- Interpretar errores de TypeScript, React Native y navegación.
- Revisar problemas de estructura JSX y componentes.
- Proponer alternativas para mejorar la compatibilidad entre Expo Go en iPhone y ejecución en navegador.
- Asistir en la implementación del CRUD de recetas.
- Orientar la incorporación de persistencia local mediante AsyncStorage.
- Mejorar la redacción técnica de la documentación del proyecto.
- Preparar explicaciones técnicas para la defensa oral.

Las decisiones finales de implementación, pruebas funcionales, adaptación del código al proyecto y validación en dispositivos fueron realizadas manualmente durante el desarrollo.

---

## Cómo ejecutar el proyecto

Primero instalar las dependencias:

```bash
npm install
```

Luego iniciar Expo:

```bash
npx expo start
```

Desde Expo se puede ejecutar la app en:

- Expo Go en un dispositivo móvil.
- Navegador web.
- Emulador Android o iOS, si está configurado.

---

## Dependencias principales

Algunas dependencias relevantes del proyecto:

```txt
@react-navigation/native
@react-navigation/bottom-tabs
@react-navigation/native-stack
@react-native-async-storage/async-storage
expo-image-picker
expo-haptics
expo-av
@expo/vector-icons
```

---

## Estado actual del proyecto

El proyecto cuenta con:

- CRUD completo de recetas.
- Persistencia local.
- Manejo de usuarios.
- Recetas por usuario.
- Recetas favoritas.
- Carga de imágenes.
- Timer.
- Navegación por tabs y stack.
- Compatibilidad probada en iPhone y navegador.
- README documentado para entrega y defensa.

---

## Limitaciones conocidas

- La persistencia es local y no se sincroniza entre dispositivos.
- La autenticación es local y fue implementada con fines académicos.
- No utiliza backend ni base de datos remota.
- Los datos pueden perderse si se limpia el almacenamiento local de la app, del navegador o de Expo Go.

---

## Posibles mejoras futuras

- Incorporar una base de datos remota.
- Agregar sincronización entre dispositivos.
- Implementar autenticación real con backend.
- Agregar búsqueda avanzada de recetas.
- Filtrar recetas por categoría.
- Permitir editar imágenes ya cargadas con más opciones.
- Agregar exportación o impresión de recetas.
- Mejorar validaciones del formulario.
- Agregar tests automatizados.

---

## Creado por

Proyecto desarrollado por Ignacio Vidal como trabajo final de desarrollo de aplicaciones móviles.
