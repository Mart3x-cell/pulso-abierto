# Pulso Abierto

Aplicación web para consultar y explorar información de criptomonedas con interfaz en modo oscuro y grilla de tarjetas.

## Tecnologías principales

- React y TypeScript
- Vite
- Zustand (gestión y persistencia de estado)
- Vitest (pruebas unitarias y de componentes)
- Consumo de API de datos de mercado (CoinGecko)

## Instalación de dependencias

```bash
npm install
```
## Despliegue en Vercel

URL pública de la aplicación desplegada: [https://pulso-abierto-two.vercel.app/]

## Verificación final

- **Pruebas ejecutadas:** Sí, se ejecutó `npm test` con Vitest y pasaron las pruebas unitarias y de componentes (`src/api/coingecko.test.ts` y `src/components/CriptoCard.test.tsx`) sin fallos.
- **Build generado correctamente:** Sí, se ejecutó `npm run build` y se generó la compilación de producción sin errores.
- **Preview comprobado:** Sí, se ejecutó `npm run preview` y se comprobó el funcionamiento de la aplicación en el navegador.
- **Despliegue realizado:** Sí, la aplicación quedó publicada en Vercel en `https://pulso-abierto-two.vercel.app/`
- **Fecha de verificación:** 23/11/2026