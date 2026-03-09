const svc = require("../services/ticketEvents.service");
const makeCrud = require("./genericCrud");
module.exports = makeCrud(svc, "ticket_event");
