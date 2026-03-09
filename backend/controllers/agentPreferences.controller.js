const svc = require("../services/agentPreferences.service");
const makeCrud = require("./genericCrud");
module.exports = makeCrud(svc, "agent_preference");
