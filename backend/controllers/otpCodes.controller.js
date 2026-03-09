const svc = require("../services/otpCodes.service");
const makeCrud = require("./genericCrud");
module.exports = makeCrud(svc, "otp_code");
