const svc = require("../services/workspaceMembers.service");
const makeCrud = require("./genericCrud");
module.exports = makeCrud(svc, "workspace_member");
