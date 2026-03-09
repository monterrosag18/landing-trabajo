const db = require("../config/mysql");

exports.getAll = () => new Promise((resolve, reject) => {
  db.query("SELECT * FROM workspace_addons", (err, r) => err ? reject(err) : resolve(r));
});

exports.getById = (id) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM workspace_addons WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r[0]));
});

exports.create = (data) => new Promise((resolve, reject) => {
  const sql = "INSERT INTO workspace_addons (workspace_id,addon_id,is_active,activated_at) VALUES (?,?,?,NOW())";
  db.query(sql, [data.workspace_id, data.addon_id, data.is_active??0],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.update = (id, data) => new Promise((resolve, reject) => {
  const sql = "UPDATE workspace_addons SET is_active=?,activated_at=? WHERE id=?";
  db.query(sql, [data.is_active, data.activated_at||null, id],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.remove = (id) => new Promise((resolve, reject) => {
  db.query("DELETE FROM workspace_addons WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r));
});
