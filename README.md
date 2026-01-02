# 🧠 Juego de Memoria en JavaScript

Este proyecto es un **Juego de Memoria (Memory Game)** desarrollado con **HTML, CSS y JavaScript puro**, enfocado en practicar buenas prácticas de programación, lógica de juego y código mantenible.

El objetivo principal fue reforzar conceptos clave como **DRY (Don't Repeat Yourself)**, manejo de estados, validaciones de usuario y experiencia visual/sonora.

---

## 🎯 Objetivo del proyecto

- Practicar lógica de comparación de cartas
- Evitar errores comunes como clics rápidos o doble clic
- Implementar un cronómetro funcional
- Refactorizar código para que sea limpio, reutilizable y escalable
- Mejorar la experiencia del usuario con feedback visual y auditivo

---

## 🚀 Funcionalidades

- ✔ Generación dinámica del tablero mediante una función reutilizable
- ✔ Lógica robusta para comparar cartas
- ✔ Prevención de errores por clics rápidos o repetidos
- ✔ Cronómetro en tiempo real
- ✔ Alertas visuales con **SweetAlert2**
- ✔ Efectos de sonido
- ✔ Reinicio del juego sin recargar la página
- ✔ Código organizado y mantenible

---

## 🧩 Principios aplicados

### DRY (Don't Repeat Yourself)
Toda la lógica de creación del tablero está centralizada en la función `generarTablero`, lo que permite modificar el diseño o comportamiento del juego desde un solo lugar.

### Código mantenible
Cada función cumple una tarea específica, facilitando la lectura, el mantenimiento y futuras mejoras.

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- SweetAlert2
