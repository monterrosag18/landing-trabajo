const db = require("../config/mysql");

exports.getAll = () => new Promise((resolve, reject) => {
  db.query("SELECT * FROM event_types", (err, r) => err ? reject(err) : resolve(r));
});

exports.getById = (id) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM event_types WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r[0]));
});

exports.create = (data) => new Promise((resolve, reject) => {
  const sql = "INSERT INTO event_types (code,label,description) VALUES (?,?,?)";
  db.query(sql, [data.code, data.label, data.description||null],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.update = (id, data) => new Promise((resolve, reject) => {
  const sql = "UPDATE event_types SET code=?,label=?,description=? WHERE id=?";
  db.query(sql, [data.code, data.label, data.description||null, id],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.remove = (id) => new Promise((resolve, reject) => {
  db.query("DELETE FROM event_types WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r));
});
