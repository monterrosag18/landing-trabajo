const svc = require("../services/attachments.service");
const makeCrud = require("./genericCrud");
module.exports = makeCrud(svc, "attachment");
