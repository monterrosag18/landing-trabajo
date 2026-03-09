const db = require("../config/mysql");

exports.getUsers = ()=>{

    return new Promise((resolve,reject)=>{

        db.query("SELECT * FROM users",(err,result)=>{

            if(err) reject(err);
            else resolve(result);

        });

    });

};

exports.createUser = (data)=>{

    return new Promise((resolve,reject)=>{

        const sql = `
        INSERT INTO users
        (email,password_hash,full_name,oauth_provider,is_global_owner,created_at)
        VALUES (?,?,?,?,?,NOW())
        `;

        db.query(sql,[
            data.email,
            data.password_hash,
            data.full_name,
            data.oauth_provider || null,
            data.is_global_owner || 0
        ],
        (err,result)=>{

            if(err) reject(err);
            else resolve(result);

        });

    });

};

exports.updateUser = (id,data)=>{

    return new Promise((resolve,reject)=>{

        db.query(
        "UPDATE users SET email=?, full_name=? WHERE id=?",
        [data.email,data.full_name,id],
        (err,result)=>{

            if(err) reject(err);
            else resolve(result);

        });

    });

};

exports.deleteUser = (id)=>{

    return new Promise((resolve,reject)=>{

        db.query(
        "DELETE FROM users WHERE id=?",
        [id],
        (err,result)=>{

            if(err) reject(err);
            else resolve(result);

        });

    });

};