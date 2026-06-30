# CLAUDE.md

Proyecto:
Aplicación web de reservas y carta editable para un restaurante (Smash Bros Burger)

Rol del agente:
Desarrollador web con 12 años de experiencia.

Objetivo:
Crear una aplicación web para un restaurante donde se pueda hacer reservar y gestionar la carta. (Todo se podrá administrar en un panel de administración)


Funcionalidades de la aplicación:
- Login y registro (supabase)
- Los clientes se pueden registrar para hacer reservas
- Los clientes tienen un rol "cliente" con acceso solo a la parte pública
- Y los usuarios de la base de datos que tengan un rol "admin"(rol asignado manualmente), podrán entrar al panel de administración

- Panel de administración privado
    - Dentro del panel se podrá:
        - Listado de reservas
        - Modificar reserva
        - Cancelar reserva
        - Gestionar la carta del restaurante
          (crud de platos, crud de secciones de la carta, cada plato irá asignado a una de estas secciones, por ejemplo (entrantes, hamburguesas, postres))

- En la parte pública:
    - Para hacer reservas necesitamos estar logeados:
        - Seleccionar fecha de reserva
        - Selección de franja horaria
        - Comprobación de disponibilidad
        - Crear reserva (necesitamos estar identificados)
        - Cancelar reserva
    - Sin necesidad de estar identificado:
        - Ver la carta y ver las diferentes páginas de la web


- En general:
    - Protección de rutas
    - Validación de solapamiento
    - Mensajes de confirmación


Stack de tecnología:
- HTML5
- CSS3 (con tailwind)
- JavaScript
- React
- Base de datos y backend: Supabase

Preferencias generales:
- Todos los textos visibles en la web deben estar en español


Preferencias de diseño:
- Básate en el documento HTML del diseño que tienes en la carpeta design del proyecto

Preferencias de estilos:
- Colores (los del diseño)
- Uso de medidas en rem, usando un font-size base de 10px
- Uso de HTML5 y CSS3 nativo
- Uso de buenas prácticas de maquetación css y si es necesario usa flexbox y css grid layout
- Que la webapp sea responsive.

Preferencias de código:
- No añadas dependencias externas
- HTML debe ser semántico
- Usa siempre let o const, y no uses nunca var
- No uses alert, confirm o prompt, todo el feedback debe ser visual en el dom
- Toda alerta o ventana que aparezca debe tener el mismo estilo que la web
- No uses innerHTML, todo el contenido debe ser insertado con appendChild o previamente creando un document.createElement
- Cuidado con olvidar prevenir el default en los eventos submit o click
- Prioriza el código legible y mantenible
- Prioriza que el código sea sencillo de entender
- Si el agente duda, que revise las especificaciones del proyecto y si no que pregunte al usuario.

Preferencias  de archivos:
- carpeta (design)
- CLAUDE.md
- estructura de ficheros más adecuada para proyectos de react (lo elige el agente de ia)

