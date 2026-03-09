/**
 * Genera un controller CRUD genérico a partir de un service.
 * El service debe implementar: getAll, getById, create, update, remove
 */
module.exports = function makeCrud(svc, entityName) {
  return {
    getAll: async (req, res) => {
      try {
        const data = await svc.getAll();
        res.json(data);
      } catch (err) {
        res.status(500).json({ error: `Error al obtener ${entityName}s`, detail: err.message });
      }
    },

    getById: async (req, res) => {
      try {
        const row = await svc.getById(req.params.id);
        if (!row) return res.status(404).json({ error: `${entityName} no encontrado` });
        res.json(row);
      } catch (err) {
        res.status(500).json({ error: `Error al obtener ${entityName}`, detail: err.message });
      }
    },

    create: async (req, res) => {
      try {
        const result = await svc.create(req.body);
        res.status(201).json({ message: `${entityName} creado`, id: result.insertId });
      } catch (err) {
        res.status(500).json({ error: `Error al crear ${entityName}`, detail: err.message });
      }
    },

    update: async (req, res) => {
      try {
        await svc.update(req.params.id, req.body);
        res.json({ message: `${entityName} actualizado` });
      } catch (err) {
        res.status(500).json({ error: `Error al actualizar ${entityName}`, detail: err.message });
      }
    },

    remove: async (req, res) => {
      try {
        await svc.remove(req.params.id);
        res.json({ message: `${entityName} eliminado` });
      } catch (err) {
        res.status(500).json({ error: `Error al eliminar ${entityName}`, detail: err.message });
      }
    },
  };
};
