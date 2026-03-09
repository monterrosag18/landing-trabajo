const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/addons.controller");

router.get("/addons",       ctrl.getAll);
router.get("/addons/:id",   ctrl.getById);
router.post("/addons",      ctrl.create);
router.put("/addons/:id",   ctrl.update);
router.delete("/addons/:id",ctrl.remove);

module.exports = router;
