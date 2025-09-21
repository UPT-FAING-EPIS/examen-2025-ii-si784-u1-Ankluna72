# Sistema de Tickets Helpdesk 헬프데스크

Un sistema web moderno y robusto para la gestión de tickets de soporte, construido desde cero con tecnologías web estándar y potenciado por los servicios en la nube de Firebase.

**[Ver la aplicación desplegada](https://helpdesk-a3bc6.web.app)**

---

## 📝 Descripción General

Este proyecto implementa una plataforma de helpdesk completa que permite a los usuarios registrarse, iniciar sesión, crear tickets de soporte y ver el estado de sus solicitudes. Además, cuenta con un panel de administración especializado para que los agentes de soporte puedan visualizar y gestionar todos los tickets del sistema.

El enfoque principal del desarrollo ha sido la creación de una aplicación modular, escalable y mantenible, utilizando **Web Components** para encapsular la lógica y el estilo de la interfaz de usuario, evitando así la dependencia de frameworks externos.

---

## ✨ Características Principales

*   **Autenticación de Usuarios:** Sistema completo de registro e inicio de sesión con validación de credenciales.
*   **Creación de Tickets:** Los usuarios pueden crear nuevos tickets detallando su problema.
*   **Dashboard de Usuario:** Cada usuario tiene un panel personal donde puede ver una lista de todos los tickets que ha creado.
*   **Dashboard de Agente:** Una vista segura y exclusiva para agentes (`rosaschambilla@gmail.com`) que muestra todos los tickets enviados por todos los usuarios.
*   **Base de Datos en Tiempo Real:** Todos los datos se almacenan y se sincronizan en tiempo real utilizando **Cloud Firestore**.
*   **Diseño Responsivo:** La interfaz se adapta correctamente a diferentes tamaños de pantalla, desde dispositivos móviles a ordenadores de escritorio.
*   **Cero Dependencias de Frameworks:** La interfaz está construida con componentes reutilizables utilizando la API nativa de Web Components.

---

## 🛠️ Tecnologías Utilizadas

El proyecto se construyó utilizando un stack de tecnologías modernas y ampliamente soportadas:

*   **Frontend:**
    *   `HTML5` (Estructura semántica)
    *   `CSS3` (Estilos modernos, Flexbox)
    *   `JavaScript (ES6+)` (Lógica de la aplicación, asincronía)
    *   **Web Components** (Custom Elements & Shadow DOM para modularidad)
*   **Backend & Infraestructura (Firebase):**
    *   **Firebase Authentication:** Para la gestión de usuarios.
    *   **Cloud Firestore:** Como base de datos NoSQL en tiempo real.
    *   **Firebase Hosting:** Para el despliegue y distribución global de la aplicación.

---

## 🚀 Cómo Probar la Aplicación

Puedes probar la funcionalidad completa directamente en la web desplegada.

### URL de la Aplicación:
**https://helpdesk-a3bc6.web.app**

### Credenciales de Prueba:

Para facilitar la evaluación, se han creado los siguientes usuarios:

#### **Usuarios Estándar:**
*   **Email:** `usuario@gmail.com`
*   **Email:** `usuario2@gmail.com`
*   **Contraseña (para ambos):** `123456`

*(Estos usuarios pueden crear y ver sus propios tickets).*

#### **Usuario Agente (Administrador):**
*   **Email:** `rosaschambilla@gmail.com`
*   **Contraseña:** `123456`

*(Este usuario será redirigido al panel de agente, donde podrá ver todos los tickets del sistema).*
