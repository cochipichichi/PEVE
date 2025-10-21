# Plataforma Exámenes de Validación de Estudios (PEVE)

Repositorio base listo para GitHub Pages / hosting estático. Incluye:

- Landing con accesos y guía del proceso (menores/mayores de 18).
- Perfiles: Estudiante, Apoderado, Profesor y Admin (demo sin backend).
- Módulo inicial: **Biología 1° Medio** (OA2, OA4, OA6, OA8) con Quiz y Ticket.
- Accesibilidad: 🌓 alto contraste, A−/A+, PWA y modo offline.
- Estructura extensible por asignatura/curso + temarios integrados.

## Estructura
```
/
  index.html
  assets/ (CSS, JS, icons, models/)
  app/ (login + vistas por rol)
  pages/ (curso, quiz, ticket, proceso, temarios)
  data/ (users.json, courses.json, temarios/)
  content/ (ciencias-naturales/ — desde tu ZIP)
  docs/importante/ (desde tu ZIP)
```
- Copiamos tus ZIPs dentro de `data/temarios`, `content/ciencias-naturales` y `docs/importante`.

## Cómo extender
1. Agrega nuevas asignaturas en `data/courses.json`.
2. Crea páginas análogas en `pages/` y botones en `index.html`.
3. Conecta Quiz/Ticket con Google Sheets o API para realismo.
4. Sustituye `assets/models/*.html` por visores 3D/AR/VR reales (model-viewer / Three.js).

## Accesos demo (sin contraseña)
- 🛠️ Admin → `app/login.html` → Admin
- 👩‍🏫 Profesor/a → `app/login.html` → Profesor
- 👩‍🎓 Estudiante → `app/login.html` → Estudiante
- 👨‍👩‍👧 Apoderado → `app/login.html` → Apoderado

> **Nota**: Para acceso real por correo/clave, implementar backend (Node/Express, Firebase, Supabase o Google Apps Script).


## Integración con Google Sheets (Apps Script)
- Configura tu Web App con el archivo `apps-script/Code.gs` y apunta `data/config.json` → `scriptUrl`.
- Páginas integradas: `quiz_bio1m.html`, `ticket_bio1m.html`, `app/admin.html` (crear + listar usuarios).
