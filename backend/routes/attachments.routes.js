const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/attachments.controller");

router.get("/attachments",       ctrl.getAll);
router.get("/attachments/:id",   ctrl.getById);
router.post("/attachments",      ctrl.create);
router.put("/attachments/:id",   ctrl.update);
router.delete("/attachments/:id",ctrl.remove);

module.exports = router;
