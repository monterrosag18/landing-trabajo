const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/workspaceAddons.controller");

router.get("/workspace-addons",       ctrl.getAll);
router.get("/workspace-addons/:id",   ctrl.getById);
router.post("/workspace-addons",      ctrl.create);
router.put("/workspace-addons/:id",   ctrl.update);
router.delete("/workspace-addons/:id",ctrl.remove);

module.exports = router;
