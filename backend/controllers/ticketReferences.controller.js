const svc = require("../services/ticketReferences.service");
const makeCrud = require("./genericCrud");
module.exports = makeCrud(svc, "ticket_reference");
