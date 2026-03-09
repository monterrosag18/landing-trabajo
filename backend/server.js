const express = require("express");
const fs = require("fs");

require("dotenv").config();

require("./config/mysql");
// require("./config/mongo"); // Desactivado temporalmente para pruebas locales de MySQL

// ── Routes ──────────────────────────────────────────────
const usersRoutes = require("./routes/users.routes");
const workspaceRoutes = require("./routes/workspaces.routes");
const importRoutes = require("./routes/import.routes");
const addonsRoutes = require("./routes/addons.routes");
const workspaceMembersRoutes = require("./routes/workspaceMembers.routes");
const agentPreferencesRoutes = require("./routes/agentPreferences.routes");
const workspaceAddonsRoutes = require("./routes/workspaceAddons.routes");
const eventTypesRoutes = require("./routes/eventTypes.routes");
const ticketReferencesRoutes = require("./routes/ticketReferences.routes");
const ticketEventsRoutes = require("./routes/ticketEvents.routes");
const otpCodesRoutes = require("./routes/otpCodes.routes");
const attachmentsRoutes = require("./routes/attachments.routes");
const invitationTokensRoutes = require("./routes/invitationTokens.routes");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// ── Mount all routes under /api ──────────────────────────
app.use("/api", usersRoutes);
app.use("/api", workspaceRoutes);
app.use("/api", importRoutes);
app.use("/api", addonsRoutes);
app.use("/api", workspaceMembersRoutes);
app.use("/api", agentPreferencesRoutes);
app.use("/api", workspaceAddonsRoutes);
app.use("/api", eventTypesRoutes);
app.use("/api", ticketReferencesRoutes);
app.use("/api", ticketEventsRoutes);
app.use("/api", otpCodesRoutes);
app.use("/api", attachmentsRoutes);
app.use("/api", invitationTokensRoutes);

const PORT = process.env.PORT || 3000;
const HTTP_PORT = process.env.HTTP_PORT || 3001;

// ── HTTP server (para Postman sin SSL) ───────────────────
const http = require("http");
http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`Server HTTP  running on port ${HTTP_PORT}  →  http://localhost:${HTTP_PORT}/api`);
});

// ── HTTPS server ─────────────────────────────────────────
try {
  const https = require("https");
  const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  };
  https.createServer(options, app).listen(PORT, () => {
    console.log(`Server HTTPS running on port ${PORT}  →  https://localhost:${PORT}/api`);
  });
} catch (e) {
  console.warn("HTTPS no disponible (key.pem/cert.pem no encontrados). Solo HTTP activo.");
}