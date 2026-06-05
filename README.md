# Proyecto Final Mobile - Recetario

Aplicación móvil desarrollada con Expo, React Native y TypeScript para gestionar recetas de cocina.

## Funcionalidades principales

- Registro e inicio de sesión local.
- Listado de recetas por usuario.
- Creación de recetas.
- Visualización del detalle de cada receta.
- Edición de recetas existentes.
- Eliminación de recetas con modal de confirmación.
- Marcado y filtrado de recetas favoritas.
- Carga de imagen desde galería o cámara.
- Timer de cocción.
- Persistencia local de datos con AsyncStorage.

## Tecnologías utilizadas

- Expo
- React Native
- TypeScript
- React Navigation
- Context API
- AsyncStorage
- Expo Image Picker
- Expo Haptics

## Persistencia local

Las recetas se almacenan localmente usando AsyncStorage. Esto permite conservar los datos creados, editados o eliminados aunque se cierre la app o se reinicie Expo Go. La persistencia es local por dispositivo, por lo que no sincroniza datos entre distintos celulares o navegadores.

## Uso de inteligencia artificial

Durante el desarrollo del proyecto se utilizó inteligencia artificial como herramienta de apoyo para analizar errores, organizar tareas, revisar fragmentos de código y proponer mejoras de implementación.

El uso de IA estuvo orientado principalmente a:

- Interpretar errores de TypeScript, React Native y navegación.
- Revisar problemas de estructura JSX y componentes.
- Proponer alternativas para mejorar la compatibilidad entre Expo Go en iPhone y ejecución en navegador.
- Asistir en la implementación del CRUD de recetas.
- Orientar la incorporación de persistencia local mediante AsyncStorage.
- Mejorar la redacción técnica de la documentación del proyecto.

Las decisiones finales de implementación, pruebas funcionales, adaptación del código al proyecto y validación en dispositivos fueron realizadas manualmente durante el desarrollo.

## Cómo ejecutar el proyecto

```bash
npm install
npx expo start
```
