const userService = require("../services/users.service");
const Log = require("../models/log.model");

const fs = require("fs");
const csv = require("csv-parser");

exports.getUsers = async (req, res) => {

    try {

        const users = await userService.getUsers();
        res.json(users);

    } catch (err) {

        res.status(500).json({
            error: "Error al obtener usuarios"
        });

    }

};

exports.createUser = async (req, res) => {

    try {

        const result = await userService.createUser(req.body);

        res.json({
            message: "Usuario creado",
            id: result.insertId
        });

    } catch (err) {

        res.status(500).json({
            error: "Error al crear usuario"
        });

    }

};

exports.updateUser = async (req, res) => {

    try {

        const id = req.params.id;

        await userService.updateUser(id, req.body);

        await Log.create({
            action: "UPDATE",
            entity: "user",
            entity_id: id,
            data: req.body
        });

        res.json({
            message: "Usuario actualizado"
        });

    } catch (err) {

        res.status(500).json({
            error: "Error al actualizar usuario"
        });

    }

};

exports.deleteUser = async (req, res) => {

    try {

        const id = req.params.id;

        await userService.deleteUser(id);

        await Log.create({
            action: "DELETE",
            entity: "user",
            entity_id: id
        });

        res.json({
            message: "Usuario eliminado"
        });

    } catch (err) {

        res.status(500).json({
            error: "Error al eliminar usuario"
        });

    }

};

/* IMPORTAR CSV */

exports.importUsersCSV = async (req, res) => {

    try {

        const results = [];

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (data) => {
                results.push(data);
            })
            .on("end", async () => {

                for (const row of results) {

                    const result = await userService.createUser({
                        email: row.email,
                        password_hash: row.password_hash,
                        full_name: row.full_name
                    });

                    await Log.create({
                        action: "CSV_IMPORT",
                        entity: "user",
                        entity_id: result.insertId,
                        data: row
                    });

                }

                res.json({
                    message: "Usuarios importados desde CSV",
                    total: results.length
                });

            });

    } catch (err) {

        res.status(500).json({
            error: "Error importando CSV"
        });

    }

};