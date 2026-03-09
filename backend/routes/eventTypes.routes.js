const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/eventTypes.controller");

router.get("/event-types",       ctrl.getAll);
router.get("/event-types/:id",   ctrl.getById);
router.post("/event-types",      ctrl.create);
router.put("/event-types/:id",   ctrl.update);
router.delete("/event-types/:id",ctrl.remove);

module.exports = router;
