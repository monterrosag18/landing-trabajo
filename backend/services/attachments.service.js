const db = require("../config/mysql");

exports.getAll = () => new Promise((resolve, reject) => {
  db.query("SELECT * FROM attachments", (err, r) => err ? reject(err) : resolve(r));
});

exports.getById = (id) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM attachments WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r[0]));
});

exports.create = (data) => new Promise((resolve, reject) => {
  const sql = "INSERT INTO attachments (ticket_ref_id,cloudinary_url,public_id,file_name,mime_type,uploaded_at) VALUES (?,?,?,?,?,NOW())";
  db.query(sql, [data.ticket_ref_id, data.cloudinary_url, data.public_id, data.file_name, data.mime_type||null],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.update = (id, data) => new Promise((resolve, reject) => {
  const sql = "UPDATE attachments SET cloudinary_url=?,file_name=?,mime_type=? WHERE id=?";
  db.query(sql, [data.cloudinary_url, data.file_name, data.mime_type||null, id],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.remove = (id) => new Promise((resolve, reject) => {
  db.query("DELETE FROM attachments WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r));
});
