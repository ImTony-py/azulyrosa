# Jardín de Niños Azul y Rosa · Sitio web

Sitio informativo para el Jardín de Niños Azul y Rosa (Irapuato, Gto.) Objetivo: Landing page informativa para que mamás y papás resuelvan sus dudas desde el celular y llamen o escriban por WhatsApp para agendar una visita.

**Estado:** borrador funcional. Los datos marcados en amarillo ("Por confirmar") siguen pendientes con la dirección del kínder.

## Público y decisiones de diseño

- Usuarias principales: mamás en teléfonos Android (también iPhone), con poca experiencia técnica.
- Mobile first, una sola página con 5 secciones y barra de navegación fija abajo (patrón tipo WhatsApp / Facebook).
- Texto de 18px, botones de mínimo 48px de alto, lenguaje sencillo en español de México.
- Botón de llamar siempre visible; cada sección termina con el call to action.
- Colores tomados del logo (azul y rosa). Nota personal: Comprobar si soporta modo oscuro del sistema.

## Estructura

```
index.html        Marcado de las 6 secciones (Inicio, Servicios, Costos, Calendario, Visítanos, Aviso de privacidad)
css/styles.css    Estilos
js/config.js      DATOS: teléfonos, precios y calendario escolar  ← lo único que se edita normalmente
js/app.js         Lógica: enlaces de contacto, tabla de precios, navegación y calendario
assets/logo.jpg   Logo actual
docs/             Documentos de trabajo con la dirección (preguntas pendientes, formato para padres)
```

Sin dependencias, sin build. HTML, CSS y JavaScript puros. La única carga externa son las fuentes de Google Fonts (Baloo 2 y Nunito); si no cargan, cae a fuentes del sistema.

## Cómo verlo en local

Abre `index.html` en el navegador, o levanta un servidor simple:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Cómo actualizar datos

Todo está en `js/config.js`:

- `KINDER.telefono` / `whatsapp`: números sin espacios (WhatsApp con 52 al inicio).
- `KINDER.inscripcion` y `KINDER.mensual`: lista de cuotas. `precio: null` muestra "Por confirmar".
- `KINDER.facebook`: enlace de la página (vacío por ahora).
- `EVENTOS`: calendario oficial SEP / SEG 2026-2027. Cada evento tiene fecha `d`, fecha final opcional `e`, texto `t` y tipo `k` (`sin`, `vac`, `aviso`).

Los textos de servicios, preguntas frecuentes y aviso de privacidad están directamente en `index.html`.

## Notas técnicas

- **Navegación:** las secciones cambian con botones `data-go` y JavaScript, no con enlaces `href="#..."`. Se hizo así porque al verse dentro de un visor embebido (iframe con sandbox) los enlaces con hash sacaban al usuario de la página. Cuando el navegador lo permite, se usa `history.pushState` para que el botón de atrás del celular regrese entre secciones.
- **Calendario:** se genera desde `EVENTOS`; abre en el mes actual y muestra "Lo que viene" con las próximas fechas.
- **Mapa:** botones a Google Maps y Waze con coordenadas fijas (no hay mapa embebido, para no depender de API keys). Falta confirmar que el pin esté exactamente en Francisco Sarabia 155.
- **Accesibilidad:** `aria-current` en la tab activa, `aria-live` en el título del mes, foco visible, respeta `prefers-reduced-motion`.

## Pendientes antes de publicar

- Fotos reales (los espacios están como marcadores), solo con autorización por escrito de los padres.
- Uniformes, documentos de inscripción, detalles de inglés, historia y foto de los fundadores.
- Clave de incorporación (CCT) y revisión legal del aviso de privacidad.
- Enlace de Facebook y perfil de Google Business.
- Decidir el logo: el conejo actual se parece mucho a un personaje con marca registrada; conviene evaluar una mascota original antes de un lanzamiento público.
- Quitar la franja "Versión de prueba" en `index.html` al publicar.

## Publicación

Al ser un sitio estático puede publicarse gratis en GitHub Pages (Settings → Pages → rama `main`, carpeta raíz), Netlify o Cloudflare Pages. El dominio propio se puede conectar después.
