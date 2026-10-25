# Licorera Tres Jotas - Frontend

## Despliegue en Laravel (importante)

Este frontend **no se publica solo**: lo sirve el proyecto de Laravel. Laravel no usa el `index.html` que genera este proyecto. En su lugar usa la vista **`resources/views/react-app.blade.php`**, que hace las veces de `index.html`.

Cada build genera archivos JS y CSS con un **hash nuevo en el nombre** (por ejemplo `main.3f2a9c1b.js`). Si después de desplegar no actualizas `react-app.blade.php`, la vista seguirá apuntando a los archivos anteriores y la web quedará en blanco o desactualizada.

### Paso a paso

1. **Generar el build** del entorno que corresponda:

   ```bash
   npm install
   npm run build:dev   # dev / pruebas (usa .env.development)
   npm run build       # producción (usa .env.production)
   ```

   Esto crea la carpeta `build/`:

   ```
   build/
   ├── index.html            <- referencia para actualizar el blade
   ├── asset-manifest.json   <- lista los archivos generados con su hash
   ├── static/
   │   ├── css/main.<hash>.css
   │   └── js/main.<hash>.js  (+ chunks <id>.<hash>.chunk.js)
   ├── images/  fonts/  icons/
   ├── favIcon.ico  manifest.json  robots.txt
   ```

2. **Copiar los archivos al `public/` de Laravel:**
   - Antes de copiar, **borra la carpeta `public/static/` anterior** de Laravel para no dejar archivos viejos acumulados.
   - Copia `build/static/` a `public/static/`. Debe quedar en la raíz del `public/`, porque la app carga los chunks dinámicamente desde `/static/js/...`. Si la cambias de ubicación, esos chunks no cargan.
   - Copia también `images/`, `fonts/`, `icons/`, `favIcon.ico`, `manifest.json` y `robots.txt` a `public/` si cambiaron. La app los busca en la raíz (`/images/...`, `/fonts/...`).
   - **No copies `build/index.html`** a Laravel. Solo sirve como referencia para el siguiente paso.

3. **Actualizar `resources/views/react-app.blade.php`:**
   - Abre `build/index.html` (o `build/asset-manifest.json`, en la clave `entrypoints`) y busca los nombres nuevos de los archivos:
     - `<link href="/static/css/main.<hash>.css" rel="stylesheet">`
     - `<script defer="defer" src="/static/js/main.<hash>.js"></script>`
   - Reemplaza en el blade las rutas del CSS y del JS anteriores por las nuevas. Ejemplo:

     ```blade
     <!DOCTYPE html>
     <html lang="es">
       <head>
         <meta charset="utf-8" />
         <link rel="icon" href="{{ asset('favIcon.ico') }}" />
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <meta name="theme-color" content="#000000" />
         <meta name="description" content="Licorera Tres Jotas" />
         <!-- dev/test: "noindex, nofollow"  |  producción: "index, follow" -->
         <meta name="robots" content="noindex, nofollow" />
         <link rel="manifest" href="{{ asset('manifest.json') }}" />
         <title>Tres Jotas</title>

         <script defer="defer" src="{{ asset('static/js/main.<hash>.js') }}"></script>
         <link href="{{ asset('static/css/main.<hash>.css') }}" rel="stylesheet" />
       </head>
       <body>
         <noscript>You need to enable JavaScript to run this app.</noscript>
         <div id="root"></div>
       </body>
     </html>
     ```

   - Copia también al blade cualquier `<meta>`, `<link>` o `<script>` nuevo que se haya agregado en `public/index.html`. El blade debe quedar equivalente al `index.html` generado.
   - Etiqueta **`robots`**: en el servidor de **dev/test** debe ser `noindex, nofollow` para que Google no indexe ese sitio. En **producción** debe ser `index, follow`. En el `index.html` este valor sale de `REACT_APP_ROBOTS`, pero el blade no lee esa variable, así que hay que ponerlo a mano según el servidor.
   - El `<div id="root"></div>` debe seguir existiendo: ahí se monta React.

4. **Limpiar cachés de Laravel y verificar:**

   ```bash
   php artisan view:clear
   php artisan cache:clear
   ```

   - Abre el sitio y recarga con `Ctrl + F5`.
   - En DevTools → Network, comprueba que `main.<hash>.js` y `main.<hash>.css` respondan **200** (no 404) y que el hash coincida con el del build.
   - Navega a una ruta interna (por ejemplo `/checkout`) y recarga la página. Laravel debe devolver `react-app.blade.php` para las rutas del frontend (ruta comodín), si no, dará 404.

### Errores comunes

| Síntoma | Causa probable |
| --- | --- |
| Pantalla en blanco y 404 en `main.<hash>.js` | El blade apunta al hash anterior, o no se copió `static/` |
| Carga la portada, pero falla al entrar a otras secciones (`ChunkLoadError`) | Faltan los archivos `*.chunk.js` o `static/` no está en la raíz de `public/` |
| Imágenes o fuentes no cargan | No se copiaron `images/`, `fonts/` o `icons/` a `public/` |
| Siguen saliendo cambios viejos | Caché del navegador o de vistas: `php artisan view:clear` y `Ctrl + F5` |
| El sitio de dev aparece en Google | El blade de dev tiene `index, follow` en lugar de `noindex, nofollow` |

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
