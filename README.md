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


## Sprint v1.2 — CRUD + Dashboard + Evidencias + 3D/AR/VR
- Admin: cursos (`course_create`, `course_list`) y asignaciones (`assign_course`, `assign_list`).
- Docente: estadísticas reales desde Sheets (`stats_by_course`, `stats_by_student`) y exportable PDF (`export_pdf`).
- Evidencias: subida a Drive con base64 (`evidence_submit`) y metadatos (userId, courseId, OA).
- Visores: `<model-viewer>` listo, coloca tus `.glb` en `assets/models/` y renombra `model.glb`.


## v1.3 — Sembrado rápido de asignaturas (1° Medio)
- Nueva página: `pages/asignaturas.html` con OA sugeridos por asignatura.
- Botón **🌱 Sembrar en Admin** (uno o todos) → crea/actualiza cursos en Google Sheets vía Apps Script.
- **Prefill Admin**: manda el curso seleccionado a `app/admin.html` para editar/guardar al tiro.
- Archivo `data/courses_seed.json` con: BIO1M, LEN1M, MAT1M, FIS1M, QUI1M, HIS1M, ING1M.
- Extractos de OA en `data/oa_extracts.json` para guiar a docentes/estudiantes.


## v1.4 — Anti-duplicados + Gráficos en Dashboard
- **Admin → assign_course** ahora actualiza si ya existe (userId+courseId) para evitar duplicados.
- **Admin → user_create** también actualiza por `id` si el usuario ya existe.
- **Docente** integra **Chart.js** con 2 gráficos:
  - **Por curso**: barras con Promedio vs Intentos por OA.
  - **Por estudiante**: línea con promedios por Curso‑OA.
