## Objetivo
Finalizar la parte de JavaScript de nuestro código para crear correctamente PRs desde dentro de nuestra acción personalizada.

## Tareas

1. Modificar el fichero 19-2-custom-actions-js.yaml añadiendo los siguientes pasos:
   - Revisar los permisos del token GH_TOKEN para verificar que tiene permisos sobre 'contents' y 'pull-requests', ambos establecidos en write.
   - Pasar el valor de secrets.GH_TOKEN al input gh-token de la acción personalizada.
2. Permitir a GitHub Actions crear PRs modificando la configuración del repositorio de la siguiente manera: 
     - Haz clic en Settings en la parte superior derecha de las pestañas del menú en la página del repositorio.
     - En el menú de la izquierda, haz clic en Actions y luego en General.
     - Desplázate hacia abajo hasta el encabezado Workflow permissions.
     - Marca la casilla junto a Allow GitHub Actions to create and approve pull requests.
3. Actualiza el archivo index.js para ejecutar los siguientes comandos si el stdout del comando git status no está vacío:
     - Ejecuta un comando git para cambiar a la nueva rama proporcionada a través del input target-branch.
     - Añade tanto los archivos package.json como package-lock.json a los archivos en staged para un commit.
     - Hacer commit de ambos archivos con el mensaje que consideres adecuado.
     - Hacer push de los cambios a la rama remota proporcionada a través del input target-branch. Es posible que tengas que añadir un -u origin ${targetBranch} después de git push para que funcione correctamente.
     - Abre un PR usando la API de Octokit. Aquí tienes el fragmento necesario para abrir el PR:
       ```javascript
       // Al principio del archivo, importa el paquete @actions/github
       const github = require('@actions/github');
       // Código restante
       const octokit = github.getOctokit(ghToken);
       try {
           await octokit.rest.pulls.create({
               owner: github.context.repo.owner,
               repo: github.context.repo.repo,
               title: `Update NPM dependencies`,
               body: `This pull request updates NPM packages`,
               base: baseBranch,
               head: targetBranch
           });
       } catch (e) {
              core.error('[js-dependency-update] : Something went wrong while creating the PR. Check logs below.');
              core.setFailed(e.message);
              core.error(e);
       }
       ```
4. Confirmar los cambios y hacer push del código. Desencadenar el flujo de trabajo desde la interfaz de usuario, y tómate unos momentos para inspeccionar la salida de la ejecución del flujo de trabajo. ¿Qué sucedió cuando el flujo de trabajo se ejecutó una segunda vez y el PR ya estaba abierto?
5. ¡Felicidades! Has creado una acción personalizada en JavaScript que comprueba si hay actualizaciones en las dependencias de npm de un proyecto y crea un PR con los archivos package*.json actualizados. 
