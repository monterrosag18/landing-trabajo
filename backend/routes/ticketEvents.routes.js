const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/ticketEvents.controller");

router.get("/ticket-events",       ctrl.getAll);
router.get("/ticket-events/:id",   ctrl.getById);
router.post("/ticket-events",      ctrl.create);
router.put("/ticket-events/:id",   ctrl.update);
router.delete("/ticket-events/:id",ctrl.remove);

module.exports = router;
