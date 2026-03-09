const db = require("../config/mysql");

exports.getAll = () => new Promise((resolve, reject) => {
  db.query("SELECT * FROM addons", (err, r) => err ? reject(err) : resolve(r));
});

exports.getById = (id) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM addons WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r[0]));
});

exports.create = (data) => new Promise((resolve, reject) => {
  const sql = "INSERT INTO addons (slug,name,description,is_active_global) VALUES (?,?,?,?)";
  db.query(sql, [data.slug, data.name, data.description||null, data.is_active_global??1],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.update = (id, data) => new Promise((resolve, reject) => {
  const sql = "UPDATE addons SET slug=?,name=?,description=?,is_active_global=? WHERE id=?";
  db.query(sql, [data.slug, data.name, data.description||null, data.is_active_global??1, id],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.remove = (id) => new Promise((resolve, reject) => {
  db.query("DELETE FROM addons WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r));
});
