# Cliente de WebSocket - Chat

<p align="center">
  <img src="./src/assets/anthofu_logo.png" alt="AnthoFu Logo" width="120"/>
</p>

Este es el proyecto frontend para una aplicación de chat en tiempo real. Se conecta a un servidor de backend a través de WebSockets (utilizando Socket.IO) para proporcionar funcionalidades de autenticación de usuarios, registro y mensajería instantánea.

## Características

-   **Autenticación de Usuarios:** Login con correo y contraseña.
-   **Registro de Nuevos Usuarios:** Formulario para crear nuevas cuentas.
-   **Chat en Tiempo Real:** Envía y recibe mensajes instantáneamente.
-   **Lista de Clientes Conectados:** Muestra los usuarios que están actualmente en línea.
-   **Estado del Servidor:** Indica si el cliente está conectado o desconectado del servidor.

## Prerrequisitos

-   [Node.js](https://nodejs.org/) (versión 18.x o superior recomendada)
-   Un servidor de backend compatible (como el del proyecto [04-teslo-shop-backend](https://github.com/AnthoFu/04-teslo-shop)).

## Configuración del Entorno

Para que la aplicación funcione, es necesario especificar la URL del servidor de backend.

1.  **Crear el archivo de entorno:**
    Crea una copia del archivo `.env.example` y renómbrala a `.env`.

    ```sh
    cp .env.example .env
    ```

2.  **Configurar la URL del API:**
    Abre el archivo `.env` y reemplaza el valor de `VITE_API_URL` con la URL de tu backend.

    ```env
    VITE_API_URL=http://localhost:3000
    ```

    Asegúrate de que la URL sea la correcta para tu entorno de desarrollo.

## Instalación

1.  Clona el repositorio (si no lo has hecho ya).

    ```
    git clone https://github.com/AnthoFu/05-ws-client
    ```


2.  Instala las dependencias del proyecto usando npm:

    ```sh
    npm install
    ```

## Modo de Desarrollo

Para ejecutar la aplicación en modo de desarrollo con recarga en caliente, utiliza el siguiente comando:

```sh
npm run dev
```

Esto iniciará un servidor de desarrollo local, generalmente en `http://localhost:5173`.

## Build de Producción

Para compilar y optimizar la aplicación para producción, ejecuta:

```sh
npm run build
```

Los archivos resultantes se guardarán en el directorio `dist/`. Puedes usar el comando `npm run preview` para previsualizar la build de producción localmente.
