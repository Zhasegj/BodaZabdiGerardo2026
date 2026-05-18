---
name: Footer Location System
description: Sistema de ubicación editable en footer con mapa, botones de acción y horarios
type: project
---

El footer incluye una sección de ubicación profesional editable desde AdminHomeEditor:

**Datos editables (content.footer.location):**
- `title` / `title_es`: Título de la sección
- `address` / `address_es`: Dirección física
- `phoneButton` / `phoneButton_es`: Texto botón "Llamar"
- `directionsButton` / `directionsButton_es`: Texto botón "Cómo llegar"
- `scheduleTitle` / `scheduleTitle_es`: Título de horarios
- `schedule[]`: Array con días/horarios (days, hours, days_es, hours_es)

**Componentes involucrados:**
- `Layout.jsx`: Renderiza el footer con mapa, botones (tel, directions) y horarios
- `AdminHomeEditor.jsx`: Editor con pestañas EN/ES y vista previa

**Por qué:** El usuario quería que el mapa de Google no estuviera "tirado" sin contexto, sino integrado en una sección profesional con botones de acción y horarios editables.

**Cómo aplicar:** Para modificar la ubicación, editar los campos en AdminDashboard → Home Editor → Footer → Sección de Ubicación. Todo es bilingüe.
