const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/workspaceMembers.controller");

router.get("/workspace-members",       ctrl.getAll);
router.get("/workspace-members/:id",   ctrl.getById);
router.post("/workspace-members",      ctrl.create);
router.put("/workspace-members/:id",   ctrl.update);
router.delete("/workspace-members/:id",ctrl.remove);

module.exports = router;
