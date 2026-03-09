const express = require("express");
const router = express.Router();

const multer = require("multer");

const upload = multer({dest:"uploads/"});

const importController = require("../controllers/import.controller");

router.post("/import/users",
upload.single("file"),
importController.importUsers
);

router.post("/import/workspaces",
upload.single("file"),
importController.importWorkspaces
);

module.exports = router;