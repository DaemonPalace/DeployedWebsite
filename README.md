# Proyecto de Desarrollo Web

## Descripción

Este proyecto consiste en el desarrollo de una página web [describe el propósito de la página, e.g., para un restaurante, una tienda en línea, un portafolio personal, etc.]. La página incluye diversas funcionalidades como la gestión de un carrito de compras, la integración de un sistema de pagos, y un diseño responsive.

## Tecnologías Utilizadas

- **HTML5**: Estructura del contenido de la página.
- **CSS**: Estilos y diseño visual de la página.
- **JavaScript**: Funcionalidades interactivas, como la gestión del carrito de compras y la integración de pagos.
- **LocalStorage**: Almacenamiento de datos del carrito de compras en el navegador.
- **Git**: Control de versiones.

## Funcionalidades

1. **Página de Menú**:
    - Muestra una lista de productos/servicios disponibles.
    - Permite a los usuarios agregar productos a un carrito de compras.
    - Calcula y muestra el total de la compra en tiempo real.
      
2. **Página de Contacto y pagina de equipo**:
    - Muestra un formulario de contacto en el cual se pueden enviar quejas, dudas, e inquietudes.
    - Permite a los usuarios la comunicacion con el negocio.
    - La pagina de equipo muestra a los integrantes
3. **Carrito de Compras**:
    - Almacena los artículos seleccionados por el usuario.
    - Permite actualizar la cantidad de cada artículo o eliminarlo del carrito.
    - Calcula el total final de la compra.

4. **Página de Checkout**:
    - Muestra un resumen del carrito de compras.
    - Permite a los usuarios ingresar sus datos de pago.
    - Procesa el pago y muestra una confirmación al usuario.

5. **Persistencia de Datos**:
    - El carrito de compras se guarda en el `localStorage` para que los datos persistan entre recargas de la página.

## Estructura del Proyecto


```bash

.
├── Landing_Page.html           # Página principal del menú
├── pagos.html                  # Página de checkout
├── InfoPage.html               # Página de equipo
├── ContactPage.html            # Página de contacto
├── Menu_page.html              # Página de menu
├── css/
│   ├── style.css               # Estilos generales del sitio
│   ├── checkout.css            # Estilos específicos para la página de checkout
│   ├── info.css                # Estilos para la página de información
│   ├── contact.css             # Estilos para la página de contacto
│   ├── menu.css                # Estilos para el menú
├── javascript/
│   ├── landing_page.js         # Lógica para la página de inicio
│   ├── menu_script.js          # Lógica del carrito de compras en la página del menú
│   ├── checkout.js             # Lógica para manejar el checkout
└── README.md                   # Archivo de documentación
