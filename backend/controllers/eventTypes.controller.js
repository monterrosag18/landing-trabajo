const svc = require("../services/eventTypes.service");
const makeCrud = require("./genericCrud");
module.exports = makeCrud(svc, "event_type");
