const svc = require("../services/invitationTokens.service");
const makeCrud = require("./genericCrud");
module.exports = makeCrud(svc, "invitation_token");
