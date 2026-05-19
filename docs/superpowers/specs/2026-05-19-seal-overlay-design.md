# Sello de Lacre — Overlay de Bienvenida con Play

## Objetivo

Bloquear la página de invitación con un overlay decorativo que muestra un sello de lacre dorado. El usuario debe hacer clic en el botón de play dentro del sello para iniciar la música y revelar el contenido de la invitación. Esto garantiza que la experiencia musical comience con una interacción explícita del usuario (evitando el bloqueo de autoplay del navegador).

## Arquitectura

### Nuevo componente: `SealOverlay.jsx`

```
src/components/wedding/SealOverlay.jsx
```

- Props: `onPlay: () => void`
- Estados internos: `sealed` (true/false)
- Responsabilidad única: mostrar el overlay con el sello y manejar su animación de apertura
- No toca el audio directamente — solo notifica al padre mediante `onPlay`

### Modificación: `Invitacion.jsx`

- Agrega estado `isPlaying` con `useState(false)`
- Renderiza `<SealOverlay onPlay={handlePlay} />` envolviendo el contenido existente
- `handlePlay` setea `isPlaying = true` → esto desencadena que el `AudioPlayer` inicie

### Modificación: `AudioPlayer.jsx`

- El botón flotante existente NO se modifica en apariencia ni comportamiento
- Se expone un mecanismo para que el padre pueda forzar la reproducción:
  - Opción A: ref expuesto con `forwardRef` + `useImperativeHandle` (más explícito)
  - Opción B: prop `forcePlay: boolean` que escucha con `useEffect` (más simple)
  - **Se elige Opción B** por simplicidad
- Al recibir `forcePlay = true`, reproduce el audio si no lo está ya
- Se elimina el intento de autoplay al montar (ya no tiene sentido con el overlay)

## Flujo

1. Usuario carga la página → ve el overlay oscuro con el sello de lacre
2. La página detrás se ve borrosa con `backdrop-filter: blur(6px)`
3. Usuario hace clic en el sello → `SealOverlay` llama a `onPlay`
4. `Invitacion` setea `isPlaying = true`
5. `AudioPlayer` detecta `forcePlay = true` y comienza la reproducción
6. Simultáneamente, `SealOverlay` inicia la animación de salida
7. El sello se parte en dos mitades que se deslizan fuera, el overlay se desvanece
8. `AnimatePresence` remueve el overlay del DOM
9. La página se ve normalmente, el botón flotante de audio sigue funcionando

## Animación (framer-motion)

| Elemento | Animación | Duración | Easing |
|---|---|---|---|
| Sello (mitad izquierda) | `x: 0 → -100vw`, rotación -10deg | 600ms | easeInOut |
| Sello (mitad derecha) | `x: 0 → 100vw`, rotación 10deg | 600ms | easeInOut |
| Overlay de fondo | opacidad: 1 → 0 | 500ms | easeInOut |
| Botón play dentro del sello | `whileTap: scale(0.94)` | instantáneo | — |

## Diseño visual

### Sello de lacre
- Diámetro: 200px (desktop), 160px (mobile)
- Fondo: `radial-gradient(circle at 35% 35%, #E8C96A, #C9A84C 40%, #A68A3E 70%, #7A6430)`
- Sombra exterior: `0 8px 40px rgba(0,0,0,0.4)` + `0 0 60px rgba(201,168,76,0.3)`
- Relieve interior: `inset 0 2px 4px rgba(255,255,255,0.3)`

### Círculo interior (160px / 130px mobile)
- Degradado: `radial-gradient(circle at 35% 35%, #D4B85A, #BFA34A 50%, #8A7535)`
- Borde: `1.5px solid rgba(255,255,255,0.15)`

### Monograma Z&G
- Fuente: Playfair Display, 28px, peso 700
- Color: `#FDF8EE`
- Letter-spacing: 4px
- Text-shadow: `0 1px 3px rgba(0,0,0,0.3)`

### Botón de play dentro del sello
- 52×52px, border-radius completo
- Degradado: `linear-gradient(135deg, #3A9B9B, #1A3A4A)` (mismo que el botón flotante)
- Borde: `2px solid rgba(255,255,255,0.25)`
- Sombra: `0 0 20px rgba(58,155,155,0.4)`
- Ícono: SVG play blanco, 24×24px

### Overlay de fondo
- Color: `rgba(26,58,74,0.65)`
- Blur: `backdrop-filter: blur(6px)`
- z-index: 50 (por encima de todo)
- Pointer-events: auto (bloquea interacción con la página)

### Texto inferior
- "Toca para descubrir" — Cormorant, 18px, `#F5ECD7`, tracking 4px, uppercase
- "Dale play a la música y comienza la experiencia" — Cormorant, 13px, `#6ABFBF`, tracking 2px

## Dependencias técnicas

- framer-motion (ya instalado)
- Tailwind CSS (ya configurado)
- Sin nuevas dependencias

## Lo que NO cambia

- El botón flotante de audio (esquina inferior derecha) se mantiene idéntico
- El `AudioPlayer` sigue funcionando como control de play/pausa
- Ningún otro componente de la página se modifica

## Pruebas

- Verificar que el overlay se muestra al cargar la página
- Verificar que el clic en el sello inicia la música
- Verificar que la animación de apertura se reproduce correctamente
- Verificar que después de la animación el overlay desaparece del DOM
- Verificar que el botón flotante funciona para pausar/reanudar
- Verificar en mobile que el sello se escala correctamente (160px)
