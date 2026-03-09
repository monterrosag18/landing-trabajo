const db = require("../config/mysql");

exports.getAll = () => new Promise((resolve, reject) => {
  db.query("SELECT * FROM workspace_members", (err, r) => err ? reject(err) : resolve(r));
});

exports.getById = (id) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM workspace_members WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r[0]));
});

exports.create = (data) => new Promise((resolve, reject) => {
  const sql = "INSERT INTO workspace_members (user_id,workspace_id,role,joined_at) VALUES (?,?,?,NOW())";
  db.query(sql, [data.user_id, data.workspace_id, data.role],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.update = (id, data) => new Promise((resolve, reject) => {
  db.query("UPDATE workspace_members SET role=? WHERE id=?", [data.role, id],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.remove = (id) => new Promise((resolve, reject) => {
  db.query("DELETE FROM workspace_members WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r));
});
