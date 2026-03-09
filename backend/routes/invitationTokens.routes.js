const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/invitationTokens.controller");

router.get("/invitation-tokens",       ctrl.getAll);
router.get("/invitation-tokens/:id",   ctrl.getById);
router.post("/invitation-tokens",      ctrl.create);
router.put("/invitation-tokens/:id",   ctrl.update);
router.delete("/invitation-tokens/:id",ctrl.remove);

module.exports = router;
