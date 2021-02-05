// Comando de ejemplo (SOLO FUNCIONA PARA USERS REISTRADOS EN LA BASE DE DATOS)

const { MessageEmbed} = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./databases/perm_users.sqlite");
module.exports.run = (client, message, args) => {
  db.get(`SELECT * FROM permisos WHERE id = `+message.author.id, (err ,table) => {
if(err) return console.error(err);
if(!table)return message.channel.send("No estás registrado así que no puedes usar este comando.");







// aqui adentro va el comando que quieras





  });
}

module.exports.help =  {
name:"test",
alises:["test"],
usage:"[ ID del bot ]",
description:"",
category:""
  
}
