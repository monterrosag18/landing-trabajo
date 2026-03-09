const db = require("../config/mysql");

exports.getAll = () => new Promise((resolve, reject) => {
  db.query("SELECT * FROM ticket_events", (err, r) => err ? reject(err) : resolve(r));
});

exports.getById = (id) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM ticket_events WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r[0]));
});

exports.create = (data) => new Promise((resolve, reject) => {
  const sql = "INSERT INTO ticket_events (ticket_ref_id,actor_member_id,event_type_id,is_system_event,created_at) VALUES (?,?,?,?,NOW())";
  db.query(sql, [data.ticket_ref_id, data.actor_member_id||null, data.event_type_id, data.is_system_event??0],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.update = (id, data) => new Promise((resolve, reject) => {
  const sql = "UPDATE ticket_events SET event_type_id=?,is_system_event=? WHERE id=?";
  db.query(sql, [data.event_type_id, data.is_system_event, id],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.remove = (id) => new Promise((resolve, reject) => {
  db.query("DELETE FROM ticket_events WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r));
});
