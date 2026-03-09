const db = require("../config/mysql");

exports.getAll = () => new Promise((resolve, reject) => {
  db.query("SELECT * FROM otp_codes", (err, r) => err ? reject(err) : resolve(r));
});

exports.getById = (id) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM otp_codes WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r[0]));
});

exports.create = (data) => new Promise((resolve, reject) => {
  const sql = "INSERT INTO otp_codes (ticket_ref_id,email,code_hash,expires_at,attempts,is_used,created_at) VALUES (?,?,?,?,?,?,NOW())";
  db.query(sql, [data.ticket_ref_id, data.email, data.code_hash, data.expires_at, data.attempts||0, data.is_used||0],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.update = (id, data) => new Promise((resolve, reject) => {
  const sql = "UPDATE otp_codes SET attempts=?,is_used=? WHERE id=?";
  db.query(sql, [data.attempts, data.is_used, id],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.remove = (id) => new Promise((resolve, reject) => {
  db.query("DELETE FROM otp_codes WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r));
});
