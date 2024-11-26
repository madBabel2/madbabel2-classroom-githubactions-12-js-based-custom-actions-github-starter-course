## Objetivo
Explorar como parsear inputs dentro de una acción personalizada en JavaScript.

## Tareas

1. Modificar el archivo action.yaml bajo la carpeta .github/actions/js-dependency-update añadiendo varios inputs necesarios:
   - **base-branch**, que debería:
      - Tener una descripción de 'The branch used as the base for the dependency update checks.'
      - Tener un valor por defecto de main.
      - No ser requerido.
   - **target-branch**, que debería:
      - Tener una descripción de 'The branch from which the PR is created.'
      - Tener un valor por defecto de update-dependencies.
      - No ser requerido.
   - **working-directory**, que debería:
      - Tener una descripción de 'The working directory of the project to check for dependency updates.'
      - Ser requerido.
   - **gh-token**, que debería:
      - Tener una descripción de 'Authentication token with repository access. Must have write access to contents and pull-requests.'
      - ser requerido.
   - **debug**, que debería:
      - Tener una descripción de 'Whether the output debug messages to the console.'
      - No ser requerido.

2. Modificar el archivo 19-2-custom-actions-js.yaml :
   - Añadir Los inputs necesarios al trigger workflow_dispatch. Estos son base-branch, target-branch, working-directory, y debug. El input gh-token para la acción puede ser recuperado desde el flujo de trabajo a través del secreto **secrets.GH_TOKEN**, y no necesita ser proporcionado como un input al flujo de trabajo. Para ver cómo recuperar datos de secretos, puede consultar la sección Tips más abajo.
   - Pasar estos inputs como parámetros a la acción js-dependency-update.
   - Actualizar el run-name del flujo de trabajo para incluir información sobre la rama base, la rama objetivo y el directorio de trabajo.

3. Actualizar el fichero index.js:
   3.1 Recuperar los inputs usando los métodos getInput y getBooleanInput del paquete @actions/core. Por ej:
      ```javascript
       const core = require('@actions/core');
       async function run() {
           const baseBranch = core.getInput('base-branch');
           const targetBranch = core.getInput('target-branch');
           const workingDirectory = core.getInput('working-directory');
           const ghToken = core.getInput('gh-token');
           const debug = core.getBooleanInput('debug');
       }
       // Ejecuta la función run
       run();
     ```
   3.2 Validar que los inputs proporcionados sigan las siguientes restricciones:
      - Los nombres de las ramas deben contener solo letras, dígitos, guiones bajos, guiones, puntos y barras inclinadas.
      - Las rutas de directorio deben contener solo letras, dígitos, guiones bajos, guiones y barras inclinadas.
      Para validar los inputs, puedes usar expresiones regulares o funciones de validación personalizadas. Por ejemplo, puedes usar la función test de una expresión regular para validar los nombres de las ramas:
        ```javascript
        const branchRegex = /^[a-zA-Z0-9-_.-\/]+$/;
        if (!branchRegex.test(baseBranch)) {
            core.setFailed('The base branch name is invalid.');
        }
        ```
   3.3 Si alguna validación falla, usa el método setFailed del paquete @actions/core para establecer un mensaje de error y fallar la ejecución de la acción.
   3.4 Si todas las validaciones pasan, imprime la siguiente información en la pantalla:
      - El valor de la rama base
      - El valor de la rama objetivo
      - El valor del directorio de trabajo
      Para escribir en la salida de la acción, puedes usar el método info del paquete @actions/core:
        ```javascript
        core.info(`Base branch: ${baseBranch}`);
        core.info(`Target branch: ${targetBranch}`);
        core.info(`Working directory: ${workingDirectory}`);
        ```
   3.5 Aprovecha el paquete @actions/exec para ejecutar scripts de shell. Para ello, usa el método exec del paquete mencionado, o el método getExecOutput cuando necesites acceso al stdout y stderr del comando:
      - Ejecuta el comando npm update dentro del directorio de trabajo proporcionado (consulta la documentación del método exec para ver cómo proporcionar el directorio de trabajo para el comando). 
        Por ejemplo, puedes usar el siguiente código para ejecutar el comando npm update:
        ```javascript
        const exec = require('@actions/exec');
        await exec.exec('npm', ['update'], { cwd: workingDirectory });
        ```
      - Ejecuta el comando git status -s package*.json para comprobar si hay actualizaciones en los archivos package*.json. Usa el método getExecOutput y almacena el valor de retorno del método en una variable para su uso posterior.
        Por ejemplo, puedes usar el siguiente código para ejecutar el comando git status:
        ```javascript
        
        let gitStatusOutput = await exec.getExecOutput('git', ['status', '-s', 'package*.json'], { cwd: workingDirectory });
        ```
      - Si el stdout del comando git status tiene algún carácter, imprime un mensaje diciendo que hay actualizaciones disponibles. De lo contrario, imprime un mensaje diciendo que no hay actualizaciones en este momento.
        Por ejemplo, puedes usar el siguiente código para comprobar si hay actualizaciones disponibles:
        ```javascript
            if (gitStatusOutput.stdout) {
                core.info('There are updates available.');
            } else {
                core.info('There are no updates at this point in time.');
            }
        ```
4. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo desde la interfaz de usuario, pasando tanto valores válidos como inválidos a todos los inputs, y tómate unos momentos para inspeccionar la salida de la ejecución del flujo de trabajo. ¿Cómo manejó la acción diferentes inputs?     

## Tips

Para recuperar un secreto en un flujo de trabajo, puedes usar la siguiente sintaxis:
   
   ```yaml
   ${{ secrets.GH_TOKEN }}
   ```

Para generar un token de Autenticación de GitHub, puedes seguir estos pasos:
   1. En tu cuenta de GitHub, ve a Settings.
   2. En el menú de la izquierda, haz clic en Developer settings.
   3. En el menú de la izquierda, haz clic en Personal access tokens.
   4. Haz clic en Tokens (classic) , y luego Haz clic en Generate new token (Classic).
   5. Dale un nombre descriptivo a tu token y selecciona los permisos necesarios (Seleccion todos si no estás seguro).
   6. Haz clic en Generate token.
   7. Copia el token generado y guárdalo en un lugar seguro. No podrás verlo de nuevo.

Para usar el token en tu flujo de trabajo, puedes almacenarlo como un secreto en tu repositorio y recuperarlo en tu flujo de trabajo. 
Para almacenar un secreto en tu repositorio, puedes seguir estos pasos:
   1. En tu repositorio, ve a Settings.
   2. En el menú de la izquierda, haz clic en Secrets and Variables.
   3. Haz click en Actions, pestaña Secrets, y clic en New repository secret.
   4. Dale un nombre descriptivo a tu secreto (GH_TOKEN) y pega el token generado en el campo Value.
   5. Haz clic en Add secret.

