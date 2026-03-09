const db = require("../config/mysql");

exports.getAll = () => new Promise((resolve, reject) => {
  db.query("SELECT * FROM invitation_tokens", (err, r) => err ? reject(err) : resolve(r));
});

exports.getById = (id) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM invitation_tokens WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r[0]));
});

exports.create = (data) => new Promise((resolve, reject) => {
  const sql = "INSERT INTO invitation_tokens (workspace_id,invited_by,email,token_hash,role,expires_at,is_used,created_at) VALUES (?,?,?,?,?,?,?,NOW())";
  db.query(sql, [data.workspace_id, data.invited_by, data.email, data.token_hash, data.role||"AGENT", data.expires_at, data.is_used||0],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.update = (id, data) => new Promise((resolve, reject) => {
  const sql = "UPDATE invitation_tokens SET role=?,is_used=? WHERE id=?";
  db.query(sql, [data.role, data.is_used, id],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.remove = (id) => new Promise((resolve, reject) => {
  db.query("DELETE FROM invitation_tokens WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r));
});
