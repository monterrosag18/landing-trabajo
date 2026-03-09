# 📬 Instrucciones Postman — Importar CSV

## ⚠️ ORDEN OBLIGATORIO (por claves foráneas)

Importa en este orden exacto, o fallará por dependencias entre tablas:

| # | Archivo CSV | Ruta Postman | Tabla |
|---|-------------|--------------|-------|
| 1 | 01_users.csv | POST http://localhost:3001/api/import/users | users |
| 2 | 02_workspaces.csv | POST http://localhost:3001/api/import/workspaces | workspaces |
| 3 | 03_addons.csv | *(POST individual)* | addons |
| 4 | 04_event_types.csv | *(POST individual)* | event_types |
| 5 | 05_workspace_members.csv | *(POST individual)* | workspace_members |
| 6 | 06_agent_preferences.csv | *(POST individual)* | agent_preferences |
| 7 | 07_workspace_addons.csv | *(POST individual)* | workspace_addons |
| 8 | 08_ticket_references.csv | *(POST individual)* | ticket_references |
| 9 | 09_ticket_events.csv | *(POST individual)* | ticket_events |
| 10 | 10_otp_codes.csv | *(POST individual)* | otp_codes |
| 11 | 11_attachments.csv | *(POST individual)* | attachments |
| 12 | 12_invitation_tokens.csv | *(POST individual)* | invitation_tokens |

---

## 📤 Cómo enviar en Postman (para users y workspaces — tienen endpoint /import)

1. Método: **POST**
2. URL: `http://localhost:3001/api/import/users`
3. Tab **Body** → seleccionar **form-data**
4. Agregar campo:
   - Key: `file` (tipo **File**)
   - Value: seleccionar el archivo CSV
5. Click **Send**

Para workspaces: mismos pasos con URL `http://localhost:3001/api/import/workspaces`

---

## 📝 Para las tablas sin endpoint /import (tablas 3-12)

Envía cada fila con **POST individual** en JSON.

**Ejemplo — addons:**
```
POST http://localhost:3001/api/addons
Content-Type: application/json

{
  "slug": "live-chat",
  "name": "Live Chat",
  "description": "Chat en tiempo real con clientes",
  "is_active_global": 1
}
```

Los CSVs tienen los datos listos para copiar fila por fila.

