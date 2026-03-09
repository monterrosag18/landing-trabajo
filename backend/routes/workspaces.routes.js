const express = require("express");
const router = express.Router();
const svc = require("../services/workspaces.service");

router.get("/workspaces", async (req, res) => {
  try { res.json(await svc.getWorkspaces()); }
  catch (err) { res.status(500).json({ error: "Error al obtener workspaces", detail: err.message }); }
});

router.get("/metrics", async (req, res) => {
  try { res.json(await svc.getMetrics()); }
  catch (err) { res.status(500).json({ error: "Error al obtener metricas", detail: err.message }); }
});

router.get("/workspaces/:id", async (req, res) => {
  try {
    const row = await svc.getById(req.params.id);
    if (!row) return res.status(404).json({ error: "Workspace no encontrado" });
    res.json(row);
  } catch (err) { res.status(500).json({ error: "Error", detail: err.message }); }
});

router.post("/workspaces", async (req, res) => {
  try {
    const r = await svc.createWorkspace(req.body);
    res.status(201).json({ message: "Workspace creado", id: r.insertId });
  } catch (err) { res.status(500).json({ error: "Error al crear workspace", detail: err.message }); }
});

router.put("/workspaces/:id", async (req, res) => {
  try {
    await svc.updateWorkspace(req.params.id, req.body);
    res.json({ message: "Workspace actualizado" });
  } catch (err) { res.status(500).json({ error: "Error al actualizar workspace", detail: err.message }); }
});

router.delete("/workspaces/:id", async (req, res) => {
  try {
    await svc.deleteWorkspace(req.params.id);
    res.json({ message: "Workspace eliminado" });
  } catch (err) { res.status(500).json({ error: "Error al eliminar workspace", detail: err.message }); }
});

module.exports = router;
