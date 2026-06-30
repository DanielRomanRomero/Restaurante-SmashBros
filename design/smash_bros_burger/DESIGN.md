---
name: Smash Bros Burger
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e6beb2'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ad897e'
  outline-variant: '#5c4037'
  surface-tint: '#ffb59e'
  primary: '#ffb59e'
  on-primary: '#5e1700'
  primary-container: '#ff571a'
  on-primary-container: '#521300'
  inverse-primary: '#ae3200'
  secondary: '#ffdb9d'
  on-secondary: '#412d00'
  secondary-container: '#feb700'
  on-secondary-container: '#6b4b00'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#909191'
  on-tertiary-container: '#282a2a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59e'
  on-primary-fixed: '#3a0b00'
  on-primary-fixed-variant: '#852400'
  secondary-fixed: '#ffdea8'
  secondary-fixed-dim: '#ffba20'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  headline-xl:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '900'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  price-display:
    fontFamily: Montserrat
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max-width: 1200px
---

## Brand & Style
El sistema de diseño para este concepto gastronómico se define como **Urban Luxury Street Food**. La personalidad es audaz, enérgica y profesional, capturando la esencia del "asfalto" de la ciudad pero con la ejecución técnica de la alta cocina. El objetivo es evocar una respuesta emocional de exclusividad accesible y satisfacción intensa.

Se utiliza una estética de **High-Contrast / Bold** mezclada con un **Minimalismo Estructurado**. La interfaz debe sentirse como una revista de moda urbana: grandes espacios en blanco (o negro en este caso), tipografía que grita presencia y una jerarquía visual clara que pone al producto —la hamburguesa— como el héroe absoluto. El diseño evita adornos innecesarios, confiando en la fuerza de sus colores y la limpieza de su diagramación.

## Colors
La paleta está diseñada para estimular el apetito y proyectar una identidad nocturna y urbana. 

- **Deep Charcoal (#1A1A1A):** El lienzo principal. Aporta profundidad y un aire premium, alejándose del negro puro para suavizar la fatiga visual.
- **Fire Orange (#FF4D00):** Color de acción principal. Representa el fuego de la plancha y la energía de la marca. Se usa en llamados a la acción (CTAs) y elementos críticos.
- **Mustard Yellow (#FFB800):** Color de acento. Aporta calidez y contraste, ideal para resaltar etiquetas, precios o elementos destacados dentro de las tarjetas.
- **Off-White (#F5F5F5):** Utilizado exclusivamente para tipografía y elementos de alto contraste sobre el fondo oscuro, garantizando una legibilidad impecable.

## Typography
La tipografía refleja la dualidad de la marca: impacto y funcionalidad. 

**Montserrat** se utiliza para todos los niveles de encabezado. Su peso "Black" (900) y "ExtraBold" (800) debe usarse para títulos de secciones y nombres de productos, creando un ritmo visual fuerte y masculino.

**Inter** se encarga del cuerpo de texto y etiquetas. Su naturaleza sistemática y neutra equilibra la agresividad de Montserrat, asegurando que las descripciones de los ingredientes y la información nutricional sean fáciles de leer. Las etiquetas (Labels) se presentan frecuentemente en mayúsculas con un ligero espaciado entre letras para mejorar la escaneabilidad en entornos digitales.

## Layout & Spacing
El sistema utiliza un **Fixed Grid** para escritorio y un modelo **Fluid** para dispositivos móviles, basado en una unidad base de 8px.

- **Desktop:** Se utiliza una retícula de 12 columnas con un ancho máximo de 1200px. Los márgenes laterales son amplios (64px) para centrar la atención en el contenido y elevar la percepción de "lujo".
- **Mobile:** El diseño colapsa a una sola columna con márgenes de 16px. Los elementos de la carta (burgers) se presentan en tarjetas de ancho completo o en un carrusel horizontal con "peek" para invitar al deslizamiento.
- **Ritmo Vertical:** Se debe priorizar el espacio negativo. Entre secciones principales, se recomienda un espaciado de 80px a 120px para permitir que la fotografía del producto respire.

## Elevation & Depth
La jerarquía se construye mediante **Capas Tonales** y **Sombras Ambientales** sutiles. A pesar de ser un diseño de alto contraste, se evita la bidimensionalidad total para mantener una sensación táctil.

- **Superficie Base:** Deep Charcoal (#1A1A1A).
- **Nivel de Tarjeta:** Se utiliza un color de superficie ligeramente más claro (#252525) para separar el contenido del fondo.
- **Sombras:** Las tarjetas y botones flotantes utilizan sombras muy difusas con una opacidad baja (20-30%) y un ligero tinte naranja en elementos activos para simular un resplandor o "glow" urbano.
- **Bordes:** Se permiten bordes finos de 1px en Mustard Yellow para elementos informativos que necesiten destacar sin usar sombras, manteniendo la estética limpia.

## Shapes
El lenguaje de formas es amigable pero estructurado. Se utiliza el nivel de redondez **2 (Rounded)** para suavizar la agresividad de los colores oscuros y la tipografía pesada.

- **Botones y Inputs:** Radio de 12px (0.75rem).
- **Tarjetas de Menú:** Radio de 16px (1rem).
- **Contenedores de Imagen:** Radio de 16px para mantener la consistencia con las tarjetas.
- **Chips de Categoría:** Radio de 24px (Pill-shaped) para diferenciar elementos de filtrado de los elementos de acción.

## Components
Los componentes deben transmitir calidad y eficiencia.

- **Botones Primarios:** Fondo Fire Orange, texto en Deep Charcoal (Montserrat Bold). Sin bordes. Efecto de elevación al hacer hover.
- **Botones Secundarios:** Outline Fire Orange o Mustard Yellow sobre fondo transparente. Texto en el mismo color del borde.
- **Tarjetas de Menú:** Imagen superior a sangre (full bleed) con esquinas redondeadas solo arriba. Información del producto abajo sobre superficie #252525. El precio debe destacar en Mustard Yellow.
- **Inputs de Formulario:** Fondo Charcoal oscuro, borde inferior Fire Orange de 2px en estado focus. Etiqueta flotante en Off-White.
- **Chips (Filtros):** Fondo transparente con borde gris oscuro; al activarse, fondo Mustard Yellow y texto Charcoal.
- **Listas de Ingredientes:** Iconografía minimalista en Fire Orange acompañada de texto en Inter regular.
- **Badge de Estado:** (Ej: "Nuevo", "Picante") Pequeñas etiquetas sólidas en la esquina superior de las tarjetas con tipografía Label-md.