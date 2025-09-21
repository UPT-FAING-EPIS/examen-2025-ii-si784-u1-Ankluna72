
# Blueprint: Helpdesk Application

## Visión General

Esta aplicación es un sistema de tickets de soporte (Helpdesk). Los usuarios pueden registrarse, iniciar sesión, crear tickets de soporte y ver el estado de sus tickets. Los agentes de soporte tienen una vista separada para gestionar los tickets de los usuarios.

## Diseño y Estilo (Versión Actual)

*   **Paleta de Colores:** Fondo con gradiente púrpura/azul oscuro, texto blanco, contenedores oscuros semi-transparentes.
*   **Tipografía:** `Roboto`.
*   **Diseño:** Centrado, con un contenedor principal para la autenticación y el dashboard.
*   **Componentes:**
    *   **Formularios de Autenticación:** Campos de entrada simples, botones con fondo de gradiente.
    *   **Dashboard de Usuario:** Lista de tickets mostrados como tarjetas oscuras.
    *   **Botones:** Botón primario con gradiente, botón secundario como enlace de texto.

---

## Plan de Implementación Actual

### Requisito 1: Redirección de Agente (Trampita)

*   **Objetivo:** Redirigir al usuario `rosaschambilla@gmail.com` al `agent-dashboard.html` después de iniciar sesión.
*   **Implementación:**
    1.  Modificar el archivo `js/auth.js`.
    2.  Dentro del manejador de éxito de `signInWithEmailAndPassword`, añadir una condición `if` para comprobar si el email del usuario es `rosaschambilla@gmail.com`.
    3.  Si es verdadero, redirigir a `agent-dashboard.html`.
    4.  Si es falso, mantener la redirección existente a `dashboard.html`.

### Requisito 2: Rediseño del Dashboard de Usuario

*   **Objetivo:** Crear una interfaz más "profesional y académica" para `dashboard.html` sin romper la funcionalidad.
*   **Implementación:**
    1.  **HTML (`dashboard.html`):**
        *   Reestructurar el `<body>` con una semántica más clara: un `<header>`, un `<main>` y un `<footer>`.
        *   El `<main>` contendrá una barra lateral de navegación (`<nav>`) y la sección de contenido principal.
        *   La barra lateral contendrá los enlaces de navegación ("Mis Tickets", "Crear Ticket").
        *   El header contendrá el logo/título y el botón de "Cerrar Sesión".
        *   Se mantendrá el ID `id="ticket-list"` para que el `dashboard.js` siga funcionando.
    2.  **CSS (`style.css`):**
        *   Añadir una clase `.dashboard-page` al `<body>` de `dashboard.html` para aislar los nuevos estilos.
        *   Eliminar el fondo de gradiente a pantalla completa para el dashboard.
        *   Usar una paleta de colores más sobria: fondo gris claro (`#f4f7f9`), detalles en azul (`#367cff`), y texto oscuro (`#333`).
        *   Diseñar nuevas tarjetas para los tickets: fondo blanco, sombra sutil (`box-shadow`), bordes redondeados y mejor espaciado interno (`padding`).
        *   Estilizar la nueva barra de navegación y el header.
        *   Rediseñar los botones para que sean más limpios y modernos.
