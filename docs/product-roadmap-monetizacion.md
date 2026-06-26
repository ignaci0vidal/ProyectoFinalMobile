# Revision PO y roadmap de monetizacion - miKitchen

## Diagnostico ejecutivo

miKitchen ya funciona como recetario personal: tiene usuarios locales, CRUD de recetas, favoritos, categorias, buscador, imagenes, timer, persistencia local y un primer experimento de packs tematicos. Para una entrega academica esta muy bien encaminado.

Para monetizar, el salto no es agregar mas pantallas sueltas. El salto es convertir la app en una herramienta que resuelva una rutina completa: elegir que cocinar, organizar la semana, comprar ingredientes, cocinar paso a paso y guardar aprendizajes.

La oportunidad mas fuerte es posicionarla como "tu asistente de cocina personal en espanol", con foco inicial en usuarios de Argentina/LatAm: recetas reales, ingredientes conocidos, unidades locales, packs tematicos y planificacion simple.

## Lo mejor del producto actual

- El concepto es entendible en pocos segundos: guardar y organizar recetas.
- El CRUD esta completo y cubre el flujo basico de usuario.
- La persistencia local ya genera sensacion de producto real.
- La separacion por usuarios permite mostrar personalizacion.
- El pack de Salsas es una buena semilla comercial: valida contenido adicional desbloqueable.
- El timer suma utilidad durante la coccion, no solo organizacion previa.
- La app tiene identidad visual propia con logo, mantel, cards y tono culinario.

## Principal problema de negocio

Hoy miKitchen compite como "otro recetario". Ese mercado es dificil porque hay alternativas gratuitas, videos, blogs, TikTok, Instagram y notas del celular.

Para que alguien pague, miKitchen tiene que ahorrar tiempo, plata o frustracion. La propuesta de valor deberia moverse hacia:

- "No se que cocinar con lo que tengo."
- "Quiero organizar comidas de la semana."
- "Quiero comprar solo lo necesario."
- "Quiero recetas confiables, en mi idioma y con medidas claras."
- "Quiero cocinar siguiendo pasos sin perderme."

## Propuesta de posicionamiento

### Version corta

miKitchen: planifica, compra y cocina tus comidas de la semana desde un solo lugar.

### Usuario objetivo inicial

Personas que cocinan en casa varias veces por semana y necesitan organizarse:

- estudiantes o jovenes que viven solos;
- parejas que quieren ordenar compras y cenas;
- familias chicas;
- personas que quieren ahorrar;
- usuarios con restricciones alimentarias simples, como sin TACC, vegetariano, bajo presupuesto o alto en proteina.

## Monetizacion recomendada

### Modelo freemium

Gratis:

- Recetario personal limitado o suficiente para probar.
- Crear recetas manualmente.
- Favoritos.
- Timer.
- Algunas recetas base.
- Un pack gratuito de bienvenida.

Premium mensual/anual:

- Packs tematicos premium.
- Planificador semanal.
- Lista de compras automatica.
- Sincronizacion entre dispositivos.
- Backup en la nube.
- Importar recetas desde enlaces.
- Escalado de porciones.
- Modo cocina paso a paso.
- Filtros avanzados por dieta, presupuesto y tiempo.

Compras individuales:

- Packs de recetas por tema: Salsas, Sin TACC, Viandas, Pastas, Postres, Fitness, Bajo costo, Cocina argentina.
- Packs de chefs o marcas.
- Menus semanales curados.

### Por que este modelo

El usuario comun necesita probar antes de pagar. El contenido premium y la planificacion son mas faciles de entender que cobrar solo por "guardar recetas". La app ya tiene el primer prototipo de pack, asi que el camino comercial esta alineado con el codigo actual.

## Proximas implementaciones prioritarias

### 1. Planificador semanal

Valor: alto. Monetizacion: alta.

Permitir asignar recetas a dias de la semana y comidas: desayuno, almuerzo, merienda, cena.

MVP:

- Nueva tab o pantalla "Plan".
- Calendario semanal simple.
- Elegir receta existente para cada comida.
- Copiar semana anterior.
- Marcar comida como completada.

Por que importa: transforma el recetario en herramienta de rutina.

### 2. Lista de compras automatica

Valor: muy alto. Monetizacion: alta.

Generar una lista de compras a partir de recetas seleccionadas o del plan semanal.

MVP:

- Agrupar ingredientes por nombre.
- Marcar comprados.
- Agregar items manuales.
- Compartir lista por WhatsApp o copiar texto.

Por que importa: ahorra tiempo y plata. Es una razon concreta para volver a abrir la app.

### 3. Packs tematicos reales

Valor: alto. Monetizacion: alta.

Convertir "Salsas" en el primer pack formal y crear infraestructura para muchos packs.

MVP:

- Tipo `RecipePack`.
- Pantalla de packs.
- Estado: disponible, agregado, proximamente, premium.
- Imagen de portada.
- Descripcion comercial.
- Cantidad de recetas.

Packs sugeridos:

- Viandas economicas.
- Sin TACC.
- Alto en proteina.
- 30 cenas en menos de 30 minutos.
- Cocina argentina.
- Pastas caseras.
- Postres faciles.

### 4. Modo cocina paso a paso

Valor: alto. Monetizacion: media.

La pantalla de detalle hoy muestra texto completo. El modo cocina deberia dividir la preparacion en pasos navegables.

MVP:

- Boton "Cocinar".
- Paso actual en pantalla grande.
- Siguiente/anterior.
- Timer asociado a un paso.
- Mantener pantalla activa durante la coccion.

Por que importa: cambia la experiencia de leer a cocinar.

### 5. Backend y cuenta real

Valor: alto. Monetizacion: obligatoria.

No se puede cobrar seriamente sin cuenta real, backup y recuperacion.

MVP tecnico:

- Supabase o Firebase Auth.
- Base remota de usuarios y recetas.
- Login con email/password.
- Backup automatico.
- Separar usuarios demo del build productivo.

### 6. Importar recetas

Valor: alto. Monetizacion: alta.

Permitir pegar una receta desde texto o link y convertirla en receta estructurada.

MVP:

- Importar desde texto pegado.
- Detectar titulo, ingredientes y pasos.
- Vista de confirmacion antes de guardar.

Version premium:

- Importar desde URL.
- Asistente IA para ordenar ingredientes, pasos, tiempos y categorias.

## Redundante o repetitivo

- Hay muchos estilos repetidos entre pantallas: `titleCard`, `descriptionCard`, `infoBox`, botones y modales. Conviene crear componentes de layout reutilizables.
- `headerCard` y `subtitle` aparecen en varios StyleSheet aunque no siempre se usan.
- `FavoriteRecipesScreen` repite logica que ya podria salir de `getFavoriteRecipes`.
- `RecipeListScreen` define `normalizeText` internamente; conviene llevarlo a utils para busqueda y futuros filtros.
- Ingredientes se guardan como string con saltos de linea. Para escalar a lista de compras, porciones o nutricion, conviene migrar a estructura: `{ name, amount, unit }`.
- El pack Salsas vive dentro de `SettingsScreen`. Deberia moverse a `data/packs` o a un contexto/servicio propio.
- Demo credentials visibles en login sirven para defensa, pero no deben existir en una version monetizable.
- `@react-native-picker/picker` sigue instalado aunque el timer usa selector propio. Si no hay usos reales, se puede remover.

## Riesgos antes de monetizar

- Passwords guardadas en texto plano local.
- No hay recuperacion de cuenta.
- No hay sincronizacion.
- No hay backup.
- No hay terminos, privacidad ni politica de datos.
- No hay analytics para medir retencion, conversion o uso de features.
- No hay paywall ni infraestructura de compras.
- No hay diferenciacion fuerte frente a notas, blogs o apps de recetas.

## Cambios de arquitectura recomendados

### Modelo Recipe

Evolucionar desde:

```ts
ingredients: string;
steps: string;
```

hacia:

```ts
servings: number;
difficulty: 'facil' | 'media' | 'avanzada';
tags: string[];
ingredients: Array<{
  name: string;
  quantity: number | null;
  unit: string;
  note?: string;
}>;
steps: Array<{
  text: string;
  timerSeconds?: number;
}>;
source: 'user' | 'demo' | 'pack';
packId?: string;
```

### Contextos

Separar:

- `AuthContext`
- `RecipesContext`
- `PacksContext`
- `MealPlanContext`
- `ShoppingListContext`

No hace falta hacerlo todo ya, pero si antes de meter planificador y compras.

## Roadmap recomendado

### Fase 1 - Producto vendible local

Objetivo: mejorar valor sin backend todavia.

- Pantalla Packs separada.
- Pack Salsas formalizado.
- 2 packs nuevos.
- Modo cocina paso a paso.
- Modelo estructurado de ingredientes.
- Lista de compras manual y desde recetas seleccionadas.
- Limpieza de UI repetida.

### Fase 2 - Retencion

Objetivo: que el usuario vuelva semanalmente.

- Planificador semanal.
- Lista de compras desde plan.
- Historial de recetas cocinadas.
- Recomendaciones: "cocinar de nuevo", "rapido", "con pocos ingredientes".
- Favoritos mejorados con filtros.

### Fase 3 - Monetizacion

Objetivo: cobrar por valor claro.

- Paywall.
- Packs premium.
- Suscripcion mensual/anual.
- Backup cloud.
- Sync multi-dispositivo.
- Analytics de conversion.

### Fase 4 - Diferenciacion

Objetivo: que miKitchen deje de ser un recetario y sea asistente.

- Importar receta desde texto/link.
- IA para ordenar recetas.
- IA para proponer menu semanal.
- Recomendaciones segun ingredientes disponibles.
- Integraciones con supermercados o afiliados.

## MVP comercial sugerido

La version minima que intentaria vender no es la actual. Seria:

- Login real.
- 30 recetas base buenas.
- 5 packs tematicos.
- Planificador semanal.
- Lista de compras automatica.
- Modo cocina.
- Backup cloud.
- Paywall simple.

Con eso ya hay una promesa clara: organizar la cocina semanal.

## Indicadores a medir

- Recetas creadas por usuario.
- Recetas cocinadas por semana.
- Uso del timer.
- Packs agregados.
- Planes semanales creados.
- Listas de compras generadas.
- Usuarios que vuelven en 7 dias.
- Conversion de usuario gratis a premium.
- Pack mas comprado/agregado.

## Veredicto PO

miKitchen tiene buena base, identidad y una direccion comercial posible. No intentaria monetizarla todavia como app publica, pero si la veo muy apta para evolucionar a un producto cobrable.

La decision clave: dejar de pensarla como "recetario" y convertirla en "sistema de cocina semanal". El recetario es la base; el negocio esta en planificacion, compras, contenido premium y asistencia durante la coccion.

Mi recomendacion es construir primero Planificador + Lista de compras + Packs formales. Ese trio crea valor recurrente y abre la puerta a cobrar sin que se sienta forzado.
