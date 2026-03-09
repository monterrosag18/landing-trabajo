const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/ticketReferences.controller");

router.get("/ticket-references", ctrl.getAll);
router.get("/ticket-references/:id", ctrl.getById);
router.post("/ticket-references", ctrl.create);
router.put("/ticket-references/:id", ctrl.update);
router.delete("/ticket-references/:id", ctrl.remove);

module.exports = router;
