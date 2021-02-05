// Comando de ejemplo (SOLO FUNCIONA PARA USERS REISTRADOS EN LA BASE DE DATOS)

const { MessageEmbed} = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./databases/perm_users.sqlite");
module.exports.run = (client, message, args) => {
  db.get(`SELECT * FROM permisos WHERE id = `+message.author.id, (err ,table) => {
if(err) return console.error(err);
if(!table)return;







// aqui adentro va el comando que quieras





  });
}

module.exports.help =  {
name:"invbot",
alises:["genbot"],
usage:"[ ID del bot ]",
description:"Generar una invitacion de un bot por su ID.",
category:"Nation Users"
  
}
