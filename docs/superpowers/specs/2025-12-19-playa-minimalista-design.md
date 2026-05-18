# Diseño: Costa Azul Minimalista

**Fecha:** 2025-12-19  
**Estado:** Implementado  
**Agente:** react-fullstack-dev

---

## 📋 Resumen

Implementación de una estética de playa minimalista para la invitación de boda de Zabdi & Gerardo, utilizando la paleta de colores playa (arena, aqua, coral, azul profundo, dorado) sin cambiar los textos existentes (solo se actualizó la frase de invitación).

---

## 🎨 Paleta de Colores

```javascript
beach: {
  arena: '#F5E6D3',      // Fondo suave arena
  aqua: '#4FB4B4',       // Verde azulado vibrante
  coral: '#FF7F50',      // Coral elegante
  azulProfundo: '#1E3A5F', // Azul mar profundo
  doradoMar: '#D4AF37',   // Dorado mar (conservado)
  jade: '#A8D5BA',       // Verde jade
  crema: '#FDFCF5'       // Fondo crema
}
```

---

## 📁 Archivos Modificados

### 1. `tailwind.config.js`
**Cambio:** Agregar paleta beach en `theme.extend.colors`

```javascript
colors: {
  beach: {
    arena: '#F5E6D3',
    aqua: '#4FB4B4',
    coral: '#FF7F50',
    azulProfundo: '#1E3A5F',
    doradoMar: '#D4AF37',
    jade: '#A8D5BA',
    crema: '#FDFCF5'
  },
  // ... resto de colores
}
```

---

### 2. `HeroSection.jsx`

**Cambio:** Actualizar frase de invitación y colores

| Antes | Después |
|-------|---------|
| `text-[#D4AF37]` | `text-coral` |
| `text-[#786045]` | `text-jade` |
| `text-[#5D4037]` | `text-azulProfundo` |
| `text-[#D4AF37]` | `text-aqua` |

**Nuevo Ornamento:** Reemplazado el SVG dorado por uno con olas minimalistas usando degradado entre jade y aqua.

---

### 3. `ProgramaSection.jsx`

**Cambios:**
- Bordes de cards: `border-[#D4AF37]/40` → `border-aqua/40`
- Títulos: `text-[#4E342E]` → `text-azulProfundo`
- Iconos: `text-[#D4AF37]` → `text-aqua`
- Descripciones: `text-[#786045]` → `text-jade`
- Separadores de día: `bg-[#D4AF37]/40` → `bg-aqua/40`
- Botón "Cómo llegar": `border-[#D4AF37]/border-[#D4AF37]` → `border-coral/coral`
- Fondo sección: `bg-[#FDFAF5]` → `bg-crema`

---

### 4. `RSVPSection.jsx`

**Cambios:**
- Bordes inputs: `border-[#D4AF37]/50` → `border-aqua/50`
- Background inputs: `bg-[#FAF7F2]` → `bg-arena`
- Texto inputs: `text-[#4E342E]` → `text-azulProfundo`
- Label acompañado: `text-[#D4AF37]` → `text-coral`
- Botones: `bg-[#D4AF37]/hover:bg-[#D4AF37]/15` → `bg-coral/hover:bg-coral/15`
- Background card: `bg-white border-[#D4AF37]/30` → `bg-white border-aqua/30`

---

### 5. `FooterSection.jsx`

**Cambios:**
- Fondo: `bg-[#2C241B]` → `bg-gradient-to-b from-azulProfundo to-azulProfundo/90`
- Ornamentos de fondo: `border-[#C9A84C]` → `border-aqua/15`
- Olas SVG de fondo: nuevo elemento decorativo con degradado entre aqua y azulProfundo
- Títulos: `text-white` → `text-arena`
- Detalles de fecha: `text-[#C9A84C]` → `text-aqua`
- Ubicación: `text-white/50` → `text-white/70`

---

### 6. `FloralDivider.jsx`

**Cambios:**
- Fondo: `bg-[#FDFAF5]` → `bg-crema`
- Colores SVG: `#C9A84C` → `#D4AF37` (mantenido dorado para elegancia)
- **Nueva:** Elementos de ola minimalistas en los bordes externos usando colores jade/aqua
- Bordes horizontales: `border-[#C9A84C]/50` → `border-aqua/40`

---

### 7. `PhotoDivider.jsx`

**Cambios:**
- Fondo sección: sin fondo → `bg-arena`
- **Nueva:** Overlay con gradiente agua
  ```jsx
  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
  ```
- **Nueva:** Efecto de brillo reflejado animado
  ```jsx
  <div className="absolute inset-0 bg-gradient-to-r from-aqua/10 via-transparent to-aqua/10 animate-pulse" />
  ```
- **Nueva:** Olas sutiles SVG en los bordes superior/inferior
- Colores texto: `#D4AF37` → `aqua`
- Background foto overlay: `bg-black/40` → mantenido (para contraste)

---

### 8. `Invitacion.jsx` (Pág. principal)

**Nuevo componente:** `BackgroundWaves()` agregado

```jsx
function BackgroundWaves() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ola 1 - 15s animation */}
      <svg ...>
        <path fill="url(#wave1)" ... />
      </svg>
      {/* Ola 2 - 18s animation */}
      <svg ...>
        <path fill="url(#wave2)" ... />
      </svg>
    </div>
  );
}
```

**Olas de fondo:**
- **Ola 1:** Gradiente coral/aqua, 15s infinite, opacidad 0.08→0.06→0.04
- **Ola 2:** Gradiente jade/aqua, 18s infinite, opacidad 0.06→0.04→0.02

---

## 🎯 Efectos Visuales

### 1. Animación de Olas (SVG)
- **Frecuencia:** 15-18 segundos (suave y orgánica)
- **Efecto:** Movimiento suave de olas de colores pastel
- **Implementación:** SVG paths con `animate` CSS

### 2. Gradientes Agua
- **Efecto:** Brillo que se refleja en las fotos
- **Animación:** `animate-pulse` (Tailwind)
- **Colores:** Degradado entre aqua y transparente

### 3. Olas de Borde (Divider)
- **Posición:** Borde superior/inferior de secciones de fotos
- **Efecto:** Movimiento orgánico
- **Colores:** Jade y aqua con opacidad 0.10-0.15

---

## ✅ Checklist de Implementación

- [x] Agregar paleta beach a Tailwind config
- [x] Actualizar HeroSection con frase coral
- [x] Cambiar colores en ProgramaSection
- [x] Actualizar RSVPSection con nuevos colores
- [x] Modificar FooterSection con gradientes y olas
- [x] Agregar elementos de ola en FloralDivider
- [x] Modificar PhotoDivider con efectos agua
- [x] Agregar BackgroundWaves a la página principal
- [x] Actualizar Ornamento dorado por olas minimalistas
- [x] Cambiar Countdown con nuevos colores
- [x] Verificar compilación (build exitoso)

---

## 🚀 Siguientes Pasos Sugeridos

1. Probar animaciones de olas con diferentes velocidades
2. Optimizar SVG de olas para performance
3. Agregar más elementos decorativos (conchas, palmeras minimalistas)
4. Considerar variantes de colores para diferentes secciones

---

## 📝 Notas del Diseño

- **Minimalismo:** El diseño evita elementos visuales excesivos, usando en su lugar el movimiento natural de las olas y los degradantes sutiles.

- **Paleta de playa:** Los colores evocan la arena, el mar, los corales y el atardecer, creando una atmósfera relajada y cálida.

- **Movimiento orgánico:** Las animaciones de olas inspiran tranquilidad, en contraste con el diseño rígido y formal tradicional de bodas.

- **Accesibilidad:** Mantenidos los contrastes adecuados entre fondos y textos (azulProfundo sobre arena/crema, coral sobre blanco/arena).

- **Versatilidad:** Los elementos de olas pueden ser ajustados para diferentes preferencias (velocidad, opacidad, amplitud).

---

**Estado:** Completado exitosamente
**Próxima:** Implementación de elementos decorativos adicionales (palmeras, conchas)
