const db = require("../config/mysql");

exports.getWorkspaces = () => new Promise((resolve, reject) => {
  db.query("SELECT * FROM workspaces", (err, r) => err ? reject(err) : resolve(r));
});

exports.getById = (id) => new Promise((resolve, reject) => {
  db.query("SELECT * FROM workspaces WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r[0]));
});

exports.createWorkspace = (data) => new Promise((resolve, reject) => {
  const sql = "INSERT INTO workspaces (owner_id,workspace_key,name,status,ai_mode,created_at) VALUES (?,?,?,?,?,NOW())";
  db.query(sql, [data.owner_id, data.workspace_key, data.name, data.status || "ACTIVE", data.ai_mode || null],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.updateWorkspace = (id, data) => new Promise((resolve, reject) => {
  const sql = "UPDATE workspaces SET name=?,status=?,ai_mode=? WHERE id=?";
  db.query(sql, [data.name, data.status, data.ai_mode || null, id],
    (err, r) => err ? reject(err) : resolve(r));
});

exports.deleteWorkspace = (id) => new Promise((resolve, reject) => {
  db.query("DELETE FROM workspaces WHERE id=?", [id], (err, r) => err ? reject(err) : resolve(r));
});

exports.getMetrics = () => new Promise((resolve, reject) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM workspaces) as total_workspaces,
      (SELECT COUNT(*) FROM ticket_references) as active_tickets,
      (SELECT COUNT(*) FROM users) as total_agents
  `;
  db.query(sql, (err, r) => err ? reject(err) : resolve(r[0]));
});
