---
name: home_content_system
description: Sistema de contenido editable para Home page via AdminDashboard
type: project
---

El contenido de la Home page (hero, whyUs, newsletter, footer) se almacena en la base de datos SQLite bajo la key 'home_content' en la tabla site-settings.

**Archivos clave:**
- `src/components/admin/AdminHomeEditor.jsx` - Editor del contenido con soporte bilingüe (en/es)
- `src/Layout.jsx` - Contiene FooterSection que consume los datos del footer
- `src/pages/Home.jsx` - Página principal que inicializa el contenido

**Estructura de datos (defaultContent):**
- `hero`: backgroundImage, titleLine1/2, subtitle, badge, botones (con versiones _es)
- `whyUs`: eyebrow, title, subtitle, features[] (con iconos de lucide-react)
- `newsletter`: title, subtitle, inputPlaceholder, buttonText (con versiones _es)
- `footer`: brandName, brandDescription, quickLinks[], categories[], contactEmail/Phone/Hours, copyright, googleMapsEmbed

**Cómo agregar nuevos campos al footer:**
1. Agregar el campo en `defaultContent.footer` en AdminHomeEditor.jsx
2. Agregar UI de edición en la sección footer del editor
3. Consumir el campo en `FooterSection` en Layout.jsx

**URL de Google Maps embed:** Se usa el formato `https://www.google.com/maps/embed?pb=!1m18!...` para mostrar la ubicación del negocio en el footer.
