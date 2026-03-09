const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/otpCodes.controller");

router.get("/otp-codes",       ctrl.getAll);
router.get("/otp-codes/:id",   ctrl.getById);
router.post("/otp-codes",      ctrl.create);
router.put("/otp-codes/:id",   ctrl.update);
router.delete("/otp-codes/:id",ctrl.remove);

module.exports = router;
