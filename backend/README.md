# SUPCRUD API

Backend para gestión de usuarios y workspaces con MySQL y MongoDB.

## Tecnologías

Node.js  
Express  
MySQL  
MongoDB  
Multer  
CSV Parser  

---

# Rutas CRUD

## USERS

GET
/api/users

POST
/api/users

PUT
/api/users/:id

DELETE
/api/users/:id

---

## WORKSPACES

GET
/api/workspaces

POST
/api/workspaces

---

# IMPORTACIÓN CSV

POST
/api/import/users

POST
/api/import/workspaces

Body:

form-data

file : archivo.csv

---

# LOGS

Todas las acciones CRUD y CSV se guardan en MongoDB.

Colección:

logs

Ejemplo:

{
 action:"CREATE",
 entity:"users",
 entity_id:5,
 data:{email:"test@test.com"},
 createdAt:"2026-03-06"
}

---

# EJECUTAR

npm install

node server.js

---

Servidor:

https://localhost:3000