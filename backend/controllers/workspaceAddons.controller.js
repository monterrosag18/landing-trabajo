const svc = require("../services/workspaceAddons.service");
const makeCrud = require("./genericCrud");
module.exports = makeCrud(svc, "workspace_addon");
