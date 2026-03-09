const db = require("../config/mysql");

exports.getAll = () => new Promise((resolve, reject) => {
  db.query("SELECT * FROM agent_preferences", (err, r) => err ? reject(err) : resolve(r));
});

exports.getById = (id) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM agent_preferences WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r[0]));
});

exports.create = (data) => new Promise((resolve, reject) => {
  const sql = "INSERT INTO agent_preferences (member_id,preference_type,value) VALUES (?,?,?)";
  db.query(sql, [data.member_id, data.preference_type, data.value],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.update = (id, data) => new Promise((resolve, reject) => {
  const sql = "UPDATE agent_preferences SET preference_type=?,value=? WHERE id=?";
  db.query(sql, [data.preference_type, data.value, id],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.remove = (id) => new Promise((resolve, reject) => {
  db.query("DELETE FROM agent_preferences WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r));
});
