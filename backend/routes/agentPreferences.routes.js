const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/agentPreferences.controller");

router.get("/agent-preferences",       ctrl.getAll);
router.get("/agent-preferences/:id",   ctrl.getById);
router.post("/agent-preferences",      ctrl.create);
router.put("/agent-preferences/:id",   ctrl.update);
router.delete("/agent-preferences/:id",ctrl.remove);

module.exports = router;
