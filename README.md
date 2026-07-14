# Landing Page — MULTISEGUROS

Informe de proyecto para el desarrollador. Este documento reúne toda la información del negocio, el branding, el contenido real ya redactado por el cliente y los lineamientos de diseño/funcionalidad que debe cumplir la landing page final.

> **Cómo trabajar este proyecto:** la landing se construye iterando sobre una plantilla base de HTML (ya se te compartió un prompt inicial para adaptarla). Puedes seguir iterando con Claude directamente —dándole instrucciones, pidiéndole ajustes, corrigiendo secciones, refinando animaciones, etc.— tantas veces como sea necesario hasta lograr el resultado deseado. No hay límite de iteraciones: el objetivo es la calidad final, no acertar a la primera.

---

## Índice

1. [Sobre el negocio](#1-sobre-el-negocio)
2. [Objetivo del proyecto](#2-objetivo-del-proyecto)
3. [Assets disponibles (carpeta `imagenes/`)](#3-assets-disponibles-carpeta-imagenes)
4. [Logo e identidad institucional — acción requerida](#4-logo-e-identidad-institucional--acción-requerida)
5. [Branding / Identidad visual](#5-branding--identidad-visual)
6. [Estilo de diseño requerido](#6-estilo-de-diseño-requerido)
7. [Referencias de diseño (wireframes del cliente)](#7-referencias-de-diseño-wireframes-del-cliente)
8. [Estructura y contenido de secciones](#8-estructura-y-contenido-de-secciones)
9. [Efectos visuales y animaciones requeridas](#9-efectos-visuales-y-animaciones-requeridas)
10. [Funcionalidad](#10-funcionalidad)
11. [Flujo de trabajo con Claude](#11-flujo-de-trabajo-con-claude)
12. [Checklist final de aceptación](#12-checklist-final-de-aceptación)

---

## 1. Sobre el negocio

| Dato | Valor |
|---|---|
| **Nombre** | MULTISEGUROS (wordmark del logo: "M SEGUROS") |
| **Giro** | Asesoría financiera, seguros y patrimonio (bróker independiente) |
| **Slogan** | "Estrategias financieras con respaldo sólido." |
| **Firma / tagline institucional** | "PROTEGE Lo que más amas" |
| **Propuesta de valor** | Acompañar a personas y familias a proteger su patrimonio, planificar su futuro y tomar decisiones financieras con confianza. Enfoque educativo, no de venta agresiva. |
| **Cobertura** | Protegemos familias y patrimonio en todo México (asesoría 100% virtual, atención en todo el país) |
| **WhatsApp** | 44 2189 7275 |
| **Correo** | mseguros911@gmail.com |
| **Facebook** | M Seguros |
| **Horario de atención** | Lunes a Viernes, 9:00 a.m. – 6:00 p.m. |
| **Valores de marca** | Honestidad, Responsabilidad, Profesionalismo, Compromiso, Confidencialidad |
| **Aseguradoras aliadas** (mostrar como logos de confianza/"aliados") | GNP Seguros, Allianz, MAPFRE, Skandia, Bupa, AARCO, Click Seguros |
| **Productos / soluciones** | Seguro de Vida, Gastos Médicos Mayores, Plan de Ahorro para la Educación, Plan Personal de Retiro (PPR), Auto, Ahorro e Inversión |

---

## 2. Objetivo del proyecto

Construir una **landing page premium** para MULTISEGUROS, con enfoque **educativo**: educar financieramente, "vender sin vender" y transmitir confianza. No es una landing de venta agresiva de seguros; es una landing de asesoría y acompañamiento, dirigida a un público que busca proteger a su familia y su patrimonio.

---

## 3. Assets disponibles (carpeta `imagenes/`)

Toda la información del negocio, branding y referencias visuales está en la carpeta `imagenes/`. Contenido:

| Archivo | Qué es | Uso |
|---|---|---|
| `logo.jpeg` | Logotipo oficial "M SEGUROS" (con fondo blanco sólido) | Ver sección 4 — requiere quitar el fondo |
| `WhatsApp Image 2026-07-13...jpeg` | Firma/lockup institucional "PROTEGE Lo que más amas" (con fondo blanco sólido) | Se usa sobrepuesta en fotografías del hero (ver referencias sección 7). También requiere quitarle el fondo |
| `WhatsApp Video 2026-07-13...mp4` | Recurso animado disponible | Revisar y evaluar si se aprovecha (p. ej. animación de logo para el loading screen). Opcional |
| `1.jpeg` – `6.jpeg` | Capturas con **copy real ya redactado** por el cliente para distintos bloques: Contacto, Nuestra esencia, Soluciones, Acompañamiento, Aliados (logos aseguradoras), Orientación (estadísticas/educación financiera) | Fuente de texto real — no inventar copy nuevo, usar este cuando aplique |
| `ejemplo_seccion_hero (6).jpeg` y `ejemplo_seccion_landing (1)-(5).jpeg` | **Wireframes/UI-UX de referencia** entregados por el cliente, con la estructura ya aprobada (mismo menú de 5 secciones que el PDF oficial) | Referencia visual principal a seguir para maquetar (ver sección 7) |
| `Entrega_Proyecto_Landing_MULTISEGUROS.pdf` | Documento oficial de entrega del cliente con objetivo, estilo y estructura aprobada | Ya está resumido e incorporado en este README. *Nota: se ignora intencionalmente la parte del PDF donde se pide que la sección "Aprende" sea editable/administrable por el cliente sin depender del programador — eso queda fuera de alcance, aquí solo se construye la landing.* |

---

## 4. Logo e identidad institucional — acción requerida

- `logo.jpeg` y la firma "PROTEGE Lo que más amas" vienen exportados **con fondo blanco sólido** (no son PNG transparentes).
- **Acción:** quitar el fondo a ambos archivos y dejarlos como PNG con transparencia real, para poder colocarlos sobre fotografías, headers o fondos de color sin ver un recuadro blanco (tal como se ve en las referencias de la sección 7, donde la firma dorada va sobrepuesta directamente sobre una fotografía).
- **Importante:** no rediseñar ni recrear el logotipo ni la firma institucional (tipografía, colores, proporciones, degradados deben mantenerse exactamente igual). Solo se hace limpieza técnica del fondo, no un rediseño.

---

## 5. Branding / Identidad visual

**Paleta de colores** (institucionales: azul marino + champagne gold). Los valores exactos abajo son aproximados a partir del logo — se recomienda tomar el color exacto con un eyedropper directo sobre `logo.jpeg` para 100% de fidelidad de marca:

| Color | Uso | Hex aproximado |
|---|---|---|
| Azul marino (primario) | Textos de títulos, botones principales, nav | `#0E2A4D` (variar entre `#0B1F3A` y `#16305C`) |
| Champagne gold (acento) | Detalles, líneas, íconos, hover, la palabra "amas" | `#C6A15B` (degradado entre `#E3C77D` y `#A8752E`) |
| Blanco profundo premium (90% del fondo) | Fondo base | `#FDFCFB` |
| Gris humo sutil (10% del fondo) | Fondos alternos de sección, tarjetas | `#F1F0EE` |
| Texto de párrafo | Cuerpo de texto | Gris oscuro `#4A4A4A` o azul marino |

**Tipografía** (a partir de las referencias visuales):
- **Títulos/headlines:** fuente serif elegante con buen contraste de trazo (estilo *Playfair Display* o *Cormorant Garamond*).
- **Texto de navegación / cuerpo / botones:** sans-serif moderna y limpia (estilo *Poppins*, *Montserrat* o *Inter*).
- **Palabra "amas" / detalles decorativos:** fuente script/caligráfica dorada (estilo *Alex Brush*, *Parisienne* o similar), igual a como aparece en la firma institucional.

**Estilo de fondo:** 90% blanco profundo premium + 10% gris humo muy sutil como alternancia entre secciones. Mucho "aire" visual (espaciado generoso, poco ruido).

---

## 6. Estilo de diseño requerido

El estilo a seguir en **toda** la landing es:

- **Premium / enterprise / corporativo de marca.**
- **High-tech y elegante**, pero a la vez **minimal** — nada recargado.
- Diseño limpio, ejecutivo y luminoso (no oscuro, no "startup casual").
- Mucho espacio en blanco, tipografía cuidada, jerarquía visual clara.
- Fotografía de personas reales, cálida y aspiracional (familias, asesorías, oficinas luminosas) — no ilustraciones genéricas de stock baratas.
- Botones y tarjetas con bordes suaves, sombras sutiles, nunca esquinas duras ni colores planos "flat" sin profundidad.

Este es el nivel de acabado que el cliente espera: una marca financiera de alta gama, no una landing genérica de plantilla.

---

## 7. Referencias de diseño (wireframes del cliente)

El cliente proporcionó capturas de referencia de **cómo quiere que se vea/sienta** su página (UI/UX de referencia, tipo wireframe de alta fidelidad):

- `imagenes/ejemplo_seccion_hero (6).jpeg`
- `imagenes/ejemplo_seccion_landing (1).jpeg` a `(5).jpeg`

Estas coinciden con la estructura de 5 secciones/menú aprobada en el PDF oficial (Inicio, Nuestra esencia, ¿Qué quieres proteger?, Aprende, Hablemos), así que son la **referencia visual principal** a seguir.

**Instrucción para el desarrollador:** al iterar con Claude, puedes pasarle directamente estas capturas como referencia visual y pedirle que la landing se vea lo más parecido posible en composición, jerarquía y estilo. **No es necesario que quede idéntico pixel a pixel**, pero sí debe respetar el mismo espíritu: el estilo premium/enterprise/minimal descrito en la sección 6.

Las imágenes numeradas `1.jpeg` a `6.jpeg` son un set de diseño alterno/complementario (con más secciones: Soluciones, Acompañamiento, Aliados, Orientación) — úsalas como **fuente de copy real y de contenido adicional** (por ejemplo, la franja de logos de aseguradoras aliadas o las estadísticas de educación financiera) para enriquecer las secciones aprobadas, no como una estructura de navegación distinta a implementar.

---

## 8. Estructura y contenido de secciones

Estructura aprobada (nav: **Inicio · Nuestra esencia · ¿Qué quieres proteger? · Aprende · Hablemos**), con copy real ya redactado por el cliente:

### Hero
- Headline (usar uno de estos, ya redactados por el cliente, o iterar sobre ellos):
  - "Decisiones de hoy, tranquilidad para mañana."
  - "La verdadera tranquilidad *se construye* antes de necesitarla."
- Subtexto: "Te ayudamos a tomar decisiones financieras que protejan a tu familia, tu patrimonio y tu futuro."
- Firma dorada "PROTEGE Lo que más amas" visible en el hero.
- Dos botones principales, ej.: "Quiero proteger lo que más amo" (primario, azul marino) y "Conoce nuestra esencia" (secundario, outline).
- WhatsApp flotante permanente (ícono redondo, siempre visible).
- Microcopy de scroll: "Descubre cómo podemos ayudarte" con flecha.

### Nuestra esencia
- Headline: "Más que seguros, somos tu aliado." / "Las mejores decisiones no siempre son las más fáciles. Son las que protegen el futuro de quienes más amas."
- Fotografía de asesoría (cliente + asesor).
- 3 bloques: **Escuchamos** (entendemos tu situación antes de recomendar), **Orientamos** (explicamos cada alternativa con lenguaje claro), **Acompañamos** (el compromiso continúa después de contratar).
- 5 valores en tarjetas: Honestidad, Responsabilidad, Profesionalismo, Compromiso, Confidencialidad (cada uno con su descripción corta, ver `ejemplo_seccion_landing (5).jpeg`).

### ¿Qué quieres proteger?
- Headline: "Lo que más importa, merece estar protegido."
- 6 tarjetas con foto + ícono + texto: **Vida**, **Gastos Médicos**, **Educación**, **Retiro**, **Auto**, **Ahorro e Inversión** (copys cortos ya redactados, ver `ejemplo_seccion_landing (4).jpeg`).
- Cierre: "No se trata solo de seguros, se trata de estrategias para tu vida."

### Aprende
- Headline: "Información que te ayuda a tomar mejores decisiones."
- 3 pilares: Aprende, Reflexiona, Aplica.
- Filtros de categoría: **Todo, Láminas, Reels, Tips, Artículos** + buscador.
- Grid de tarjetas de contenido de ejemplo (título, fecha, tipo) — contenido estático de muestra, **sin backend/CMS** (ver nota en sección 3).
- Botón "Ver más contenido".

### Hablemos (Contacto)
- Headline: "Estamos aquí para ayudarte." / "Cada gran decisión comienza con una conversación."
- Formulario: Nombre completo, WhatsApp/Teléfono, "¿Sobre qué tema deseas recibir orientación?" (select), Mensaje, checkbox de Aviso de Privacidad, botón "Comencemos la conversación" / "Enviar mensaje".
- Al enviar, el formulario debe **abrir una conversación de WhatsApp** con el número de contacto (mensaje prellenado) y además notificar al correo `mseguros911@gmail.com`.
- Franja de contacto: WhatsApp (44 2189 7275), Horario de atención (Lun–Vie 9am–6pm), Atención en todo México (100% virtual), Facebook (M Seguros).

---

## 9. Efectos visuales y animaciones requeridas

El sitio debe sentirse vivo y de alta gama, no estático. Requisitos explícitos:

- **Pantalla de carga (loading screen):** overlay de pantalla completa con spinner de carga combinado con el logo del negocio (por ejemplo, un anillo dorado girando alrededor del logo centrado), que desaparece con un fade-out suave cuando la página termina de cargar.
- **Animaciones de scroll:** las secciones y tarjetas deben aparecer con animación al entrar en el viewport (fade-in + desplazamiento sutil hacia arriba), no aparecer de golpe.
- **Efectos en el título del Hero:**
  - Efecto **máquina de escribir** (typewriter) en el título o subtítulo principal.
  - Efecto de **letras que cambian de color** en el título (por ejemplo, un degradado animado o un resaltado progresivo en dorado sobre palabras clave del headline).
- **Micro-interacciones:** hover states suaves en botones (escala/sombra), subrayado animado en el menú de navegación, pulso sutil en el botón flotante de WhatsApp.
- **Scroll suave** entre secciones al hacer clic en el menú (smooth scroll).

---

## 10. Funcionalidad

- Menú con scroll suave entre secciones (anchors).
- WhatsApp flotante permanente en todas las secciones.
- Formulario de contacto funcional: confirmación visual de envío + apertura de conversación de WhatsApp + envío/notificación a `mseguros911@gmail.com`.
- Totalmente responsive: móvil, tablet y escritorio.
- Sección "Aprende" con contenido estático de muestra (sin panel de administración — fuera de alcance para esta landing).

---

## 11. Flujo de trabajo con Claude

- El desarrollador trabaja sobre la plantilla base HTML ya compartida (con el prompt inicial ya entregado).
- Se puede **iterar libremente con Claude**: pedir ajustes de layout, de copy, de animaciones, corregir detalles, refinar la paleta, etc. No hay límite de vueltas — el objetivo es llegar al resultado deseado con la calidad esperada, no acertar en el primer intento.
- Al pedirle cambios a Claude, se le puede **pasar directamente las capturas de referencia** (`ejemplo_seccion_hero` / `ejemplo_seccion_landing`) para que la página se acerque visualmente a lo que el cliente mostró. No tiene que quedar idéntico, pero sí debe mantener el estilo premium/enterprise/minimal definido en este documento.
- Toda la información de negocio, copy real, contactos y branding para dársela a Claude como contexto está en este mismo README — no es necesario inventar contenido nuevo salvo que se esté iterando sobre el copy existente.

---

## 12. Checklist final de aceptación

- [ ] Logo y firma institucional con fondo transparente (PNG), sin alterar diseño original.
- [ ] Paleta azul marino + champagne gold aplicada consistentemente importante que la pagina sea tema claro es decir fondo blanco etc como las imagenes que el cliente solicito.
- [ ] Estilo premium/enterprise/minimal en todas las secciones (no plantilla genérica).
- [ ] 5 secciones completas con el copy real: Hero, Nuestra esencia, ¿Qué quieres proteger?, Aprende, Hablemos.
- [ ] Pantalla de carga con spinner + logo.
- [ ] Animaciones de scroll (reveal) en secciones/tarjetas.
- [ ] Efecto typewriter en el título del Hero ojo hazlo solamente a una palabra del hero y que siempre este iterando esta palabra.
- [ ] Efecto de cambio de color en las letras del título del Hero.
- [ ] WhatsApp flotante persistente.
- [ ] Formulario funcional (WhatsApp + correo) con confirmación de envío.
- [ ] Responsive verificado en móvil, tablet y escritorio.
- [ ] Datos de contacto correctos: WhatsApp 44 2189 7275, correo mseguros911@gmail.com, Facebook M Seguros.
