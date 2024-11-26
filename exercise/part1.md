## Objetivo
Explorar cómo crear una acción personalizada en JavaScript en GitHub Actions.

Crearemos una acción personalizada en JavaScript que compruebe si hay actualizaciones en las dependencias de npm de un proyecto, y abstraer esa lógica detrás de una acción reutilizable fácil de usar.

## Tareas

1. Crear la carpeta .github/actions/js-dependency-update. Esta carpeta es donde alojaremos todos los archivos de nuestra acción personalizada en JavaScript.
2. Abrir una terminal y cambiar a este directorio.
3. Inicializar un proyecto npm ejecutando el comando:
```bash
npm init -y
```
4. Instalar las dependencias de github actions necesarias ejecutando:
```bash
npm install @actions/core@1.10.1 @actions/exec@1.1.1 @actions/github@6.0.0 --save-exact
```
5. Crear un archivo index.js en la carpeta .github/actions/js-dependency-update y añadir el siguiente código al archivo:
    ```javascript
    const core = require('@actions/core');
    async function run() {
        // Escritura en la salida de la acción
      core.info('I am a custom JS action');
    }
    // Ejecuta la función run
    run();
    ```
   El código anterior aprovecha el paquete @actions/core para escribir una línea en la salida de nuestra acción personalizada.
6. Crear un archivo llamado action.yaml en la carpeta .github/actions/js-dependency-update.
7. En el archivo action.yaml, añadir las siguientes propiedades:
   - Un 'name' de Update NPM Dependencies;
   - Un 'description' de "Checks if there are updates to NPM packages, and creates a PR with the updated package*.json files";
   - Añadir una key 'runs' a nivel de workflow. Esta es la clave principal para definir nuestra acción personalizada en JavaScript. Para una acción personalizada en JavaScript, la key 'runs' tiene la siguiente forma:
```yaml
runs:
  using: node20
  main: index.js
```
   donde:
        - 'using: <Node version>' define con qué versión de NodeJS se ejecutará la acción.
        - 'main: <JavaScript file>' define **qué archivo se ejecutará como punto de entrada** de nuestra acción personalizada en JavaScript.

8. Crear un archivo 19-2-custom-actions-js.yaml en la carpeta .github/workflows en la raíz de tu repositorio.
   - Nombrar el flujo de trabajo 19 - 2 - Custom Actions - JS.
   - desencadenantes:
     - workflow_dispatch
   - Establecer la opción run-name del flujo de trabajo en 19 - 2 - Custom Actions - JS.
   - Trabajos:
     - **dependency-update**:
       - Debería ejecutarse en ubuntu-latest.
       - Debería contener dos steps:
         - El primer step debería hacer checkout del código.
         - El segundo step, llamado Check for dependency updates, debería usar la acción personalizada en JS creada en pasos anteriores. Para hacer referencia a una acción personalizada creada en el mismo repositorio que el flujo de trabajo, simplemente puedes proporcionar la ruta del directorio donde se encuentra el archivo action.yaml. En este caso, esto sería ./.github/actions/js-dependency-update.
9. Modificar el archivo .gitignore en la raíz del repositorio para que la carpeta node_modules bajo la carpeta js-dependency-update no esté ignorada. Debería ser subida al repositorio si queremos que nuestra acción funcione correctamente. Una forma de hacerlo es añadir la siguiente línea al archivo: !.github/actions/**/node_modules. Esto asegurará que todas las carpetas node_modules bajo cualquier subdirectorio de la carpeta .github/actions sean incluidas en los commits de github, mientras que aún se ignoran los directorios node_modules de otras carpetas.
10. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo desde la interfaz de usuario y tómate unos momentos para inspeccionar la salida de la ejecución del flujo de trabajo.
