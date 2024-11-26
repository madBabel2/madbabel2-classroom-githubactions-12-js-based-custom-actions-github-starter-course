# Ejercicio GitHub Actions: Creación de una Acción JS Personalizada
## Objetivo

Este ejercicio tiene como objetivo guiarte en la creación de una acción personalizada en JavaScript para GitHub Actions. Se divide en tres partes principales, con el objetivo de crear una acción personalizada en JS que revise actualizaciones en las dependencias de npm, valide inputs, y automatice la creación de Pull Requests (PRs) en GitHub. 

## Partes del ejercicio

1. **Crear la Acción Básica** [link Ejercicio](./exercise/part1.md), cuyo objetivo es construir una acción en JavaScript que utilice paquetes de GitHub Actions como @actions/core. Pasos Principales:
      - Crear el proyecto y estructura inicial en .github/actions/js-dependency-update.
      - Escribir un script básico en index.js para ejecutar comandos.
      - Configurar un archivo action.yaml que define el comportamiento de la acción.
      - Crear un flujo de trabajo (.github/workflows/) para ejecutar la acción.
    
3. **Parsear y Validar Inputs** [link Ejercicio](./exercise/part2.md) cuyo objetivo es Agregar inputs al archivo action.yaml y manejarlos en index.js. Tareas:
    - Definir inputs como base-branch, target-branch, y gh-token.
    - Usar core.getInput para recuperar estos valores y validarlos.
    - Ejecutar comandos como npm update y analizar resultados con git status.
      
4. **Automatizar la Creación de PRs** [link Ejercicio](./exercise/part3.md) cuyo objetivo es finalizar la acción añadiendo funcionalidades para generar PRs. Tareas:
    - Modificar el flujo de trabajo para pasar el token GH_TOKEN.
    - Usar Octokit para abrir PRs automáticamente.
    - Manejar posibles errores y verificar permisos del token.

# Ejercicio GitHub Actions: Creación de una Acción JS Personalizada
## Objetivo

Este ejercicio tiene como objetivo guiarte en la creación de una acción personalizada en JavaScript para GitHub Actions. Se divide en tres partes principales, con el objetivo de crear una acción personalizada en JS que revise actualizaciones en las dependencias de npm, valide inputs, y automatice la creación de Pull Requests (PRs) en GitHub. 

## Partes del ejercicio

1. **Crear la Acción Básica** [link Ejercicio](./exercise/part1.md), cuyo objetivo es construir una acción en JavaScript que utilice paquetes de GitHub Actions como @actions/core. Pasos Principales:
      - Crear el proyecto y estructura inicial en .github/actions/js-dependency-update.
      - Escribir un script básico en index.js para ejecutar comandos.
      - Configurar un archivo action.yaml que define el comportamiento de la acción.
      - Crear un flujo de trabajo (.github/workflows/) para ejecutar la acción.
    
3. **Parsear y Validar Inputs** [link Ejercicio](./exercise/part2.md) cuyo objetivo es Agregar inputs al archivo action.yaml y manejarlos en index.js. Tareas:
    - Definir inputs como base-branch, target-branch, y gh-token.
    - Usar core.getInput para recuperar estos valores y validarlos.
    - Ejecutar comandos como npm update y analizar resultados con git status.
      
4. **Automatizar la Creación de PRs** [link Ejercicio](./exercise/part3.md) cuyo objetivo es finalizar la acción añadiendo funcionalidades para generar PRs. Tareas:
    - Modificar el flujo de trabajo para pasar el token GH_TOKEN.
    - Usar Octokit para abrir PRs automáticamente.
    - Manejar posibles errores y verificar permisos del token.

