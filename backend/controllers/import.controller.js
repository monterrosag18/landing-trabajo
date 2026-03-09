const fs = require("fs");
const csv = require("csv-parser");

const usersService = require("../services/users.service");
const workspacesService = require("../services/workspaces.service");

const Log = require("../models/log.model");

exports.importUsers = async(req,res)=>{

    const results=[];

    fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data",(data)=>results.push(data))
    .on("end",async()=>{

        for(const row of results){

            const result = await usersService.createUser(row);

            await Log.create({
                action:"CSV_IMPORT",
                entity:"users",
                entity_id:result.insertId,
                data:row
            });

        }

        res.json({
            message:"Usuarios importados",
            total:results.length
        });

    });

};

exports.importWorkspaces = async(req,res)=>{

    const results=[];

    fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data",(data)=>results.push(data))
    .on("end",async()=>{

        for(const row of results){

            const result = await workspacesService.createWorkspace(row);

            await Log.create({
                action:"CSV_IMPORT",
                entity:"workspaces",
                entity_id:result.insertId,
                data:row
            });

        }

        res.json({
            message:"Workspaces importados",
            total:results.length
        });

    });

};