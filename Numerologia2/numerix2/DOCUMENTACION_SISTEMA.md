# 📜 Documentación Técnica: Aetheric Oracle (Numerix2)

Este documento detalla la arquitectura, las vistas y las funcionalidades principales del ecosistema **Aetheric Oracle**, una plataforma de numerología y consulta astral de alta gama.

---

## 🧭 Flujo Cronológico (User Journey)
Para entender la experiencia del buscador, este es el orden exacto de interacción:
1. **El Llamado (`Identidad.vue`):** El usuario aterriza en la interfaz astral y decide "Elegir su Camino".
2. **El Portal (`Login.vue`):** Se identifica o crea su identidad digital.
3. **El Santuario (`Página Principal`):** Tras el login, accede a su panel central personalizado.
4. **La Consulta:** El usuario navega hacia *Lecturas* o *Predicciones*.
5. **La Ascensión (`Planes` y `Pago`):** Al elegir un plan de mayor nivel, el flujo le lleva a la pasarela de pago para desbloquear su destino completo.

---

## 1. Arquitectura de Navegación (`src/router/index.js`)
El sistema utiliza **Vue Router** para gestionar una Single Page Application (SPA).
- **Rutas Principales:** 
  - `/`: Aterrizaje/Identidad.
  - `/login`: Portal de acceso.
  - `/dashboard`: Página Principal (Panel de control).
  - `/lecturas`: Módulo interactivo de Tarot y Numerología.
  - `/predicciones`: Generador de consejos astrales.
  - `/biblioteca`: Historial persistente.
  - `/planes`: Suscripciones.
  - `/pago`: Pasarela de pagos final.

---

## 2. Vistas del Santuario (Pages)

### 🌌 Identidad (`Identidad.vue`)
La puerta de entrada al oráculo.
- **Funcionalidad:** Presentación visual del concepto y botón de acceso principal.
- **Efectos Astrales:**
  - `celestial-bg`: Fondo con estrellas fijas, nebulosas y **estrellas fugaces** animadas por CSS.
  - `cta-button`: Botón con brillo dorado que redirige al portal de acceso.

### 🗝️ Login (`Login.vue`)
Sistema de autenticación y personalización inicial.
- **Modos:** Alternancia entre "Identificación" (Login) y "Creación de Identidad" (Registro).
- **Persistencia de Nombre:**
  - Al registrarse, captura el "Nombre Terrenal".
  - Al iniciar sesión, extrae el nombre del email (ej: `santiago@...` -> `Santiago`).
  - Almacena el nombre en `localStorage` bajo la clave `userName`.

### 🏰 Página Principal (`Dashboard.vue`)
Centro neurálgico del usuario.
- **Header Dinámico:** Bienvenida personalizada con el nombre del usuario registrada en el login.
- **Monitores Astrales:** Simulación en tiempo real de "Resonancia Etérea" y "Probabilidad Lunar".
- **Botón de Perfil:** Activa el modal de `userProfile.js`.
- **Navegación:** Representada en el menú lateral como la sección maestra del oráculo.

### 🃏 Mis Lecturas (`MisLecturas.vue`)
El motor de interpretación más complejo.
- **Simulador de Tarot:** Genera una tirada de 3 cartas (Pasado, Presente, Futuro) con significados astrales únicos.
- **Composables/Logic:** Utiliza arrays extensos de simbología y descripciones herméticas.
- **Guardado:** Al finalizar una lectura, se guarda automáticamente en el historial a través de `historyManager.js`.

### 🔮 Predicciones (`Predicciones.vue`)
Interfaz de consulta directa basado en formularios.
- **Campos:** Nombre y fecha de nacimiento.
- **Generación:** Simula una canalización energética antes de revelar una predicción detallada de 5 puntos (Carrera, Amor, Salud, etc.).
- **Biblioteca:** Permite guardar la predicción para consulta futura.

### 📚 Biblioteca (`Biblioteca.vue`)
El registro cronológico de la sabiduría del usuario.
- **Filtros:** Permite ver el historial completo organizado por meses.
- **Integración:** Consume datos directamente del `historyManager`.

### 💳 Planes y Pago (`Planes.vue` & `Pago.vue`)
Módulo comercial y de suscripción.
- **Planes:** 3 niveles (Esencia, Astral, Galáctico) con beneficios progresivos.
- **Pasarela de Pago:**
  - **Conversor de Moneda:** Soporta USD, EUR, COP, MXN con tasas reales.
  - **SweetAlert2:** Reemplaza los diálogos del sistema por alertas doradas interactivas.
  - **Validación:** Simula el procesamiento de tarjetas de crédito.

---

## 3. Utilidades Maestras (Logic)

### 💾 Gestor de Historial (`historyManager.js`)
Encargado de la persistencia de datos sin necesidad de base de datos externa (Local-First).
- `saveToLibrary(item)`: Guarda lecturas o predicciones.
- `getLibrary()`: Recupera todos los registros guardados.
- `formatLibraryByMonth()`: Agrupa los datos cronológicamente para la vista de Biblioteca.

### 👤 Perfil de Usuario (`userProfile.js`)
Módulo centralizado de gestión de identidad.
- **Modal SweetAlert2:** Un cuadro de diálogo premium que permite:
  - **Visualizar Nombre:** Campo de solo lectura para seguridad.
  - **Cambiar Contraseña:** Con visualización (ojo mágico) integrada.
  - **Cerrar Sesión:** Limpia el `localStorage` y redirige al inicio (`/`).

---

## 4. Diseño y Estética (Vanina CSS)
La aplicación utiliza un sistema de **Glassmorphism** y **Celestial Dark Mode**.
- **Colores:** `--bg-color` (#050610), `--accent-gold` (#dbc065).
- **Fuentes:** Cinzel (Títulos), Playfair Display (Serif Elegante), Inter (Lectura).
- **Animaciones:** `@keyframes` personalizados para nebulosas, estrellas fugaces y transiciones de "fade-in".

---
*Documento generado por Antigravity para Numerix2.*
