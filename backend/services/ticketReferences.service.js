const db = require("../config/mysql");

exports.getAll = () => new Promise((resolve, reject) => {
  db.query("SELECT * FROM ticket_references", (err, r) => err ? reject(err) : resolve(r));
});

exports.getById = (id) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM ticket_references WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r[0]));
});

exports.create = (data) => new Promise((resolve, reject) => {
  const sql = "INSERT INTO ticket_references (reference_code, workspace_id, user_email, subject, description, type, status, created_at) VALUES (?,?,?,?,?,?,?,NOW())";
  const params = [
    data.reference_code,
    data.workspace_id,
    data.user_email,
    data.subject || 'Sin Asunto',
    data.description || null,
    data.type || 'P',
    data.status || 'OPEN'
  ];
  db.query(sql, params, (err, r) => err ? reject(err) : resolve(r));
});

exports.update = (id, data) => new Promise((resolve, reject) => {
  const sql = "UPDATE ticket_references SET reference_code=?, user_email=?, subject=?, description=?, type=?, status=? WHERE id=?";
  const params = [
    data.reference_code,
    data.user_email,
    data.subject,
    data.description,
    data.type,
    data.status,
    id
  ];
  db.query(sql, params, (err, r) => err ? reject(err) : resolve(r));
});

exports.remove = (id) => new Promise((resolve, reject) => {
  db.query("DELETE FROM ticket_references WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r));
});
