const svc = require("../services/addons.service");
const makeCrud = require("./genericCrud");
module.exports = makeCrud(svc, "addon");
