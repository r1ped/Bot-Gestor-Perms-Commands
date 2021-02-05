/* ESTE COMANDO SOLO DEBE SER EJECUTADO UNA VEZ YA QUE SU ÚNICA FUNCION ES CREAR LA TABLA
   RECUERDA QUE SI QUERÉS ELIMINAR LA BASE DE DATOS; ELIMINA EL ARCHVIVO DESDE LA SECCION DATABASES/NOMBRE DE LA BASE DE DATOS
   Y VOLVER A USAR ESTE COMANDO PARA CREAR TODO DESDE 0
*/


const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const sqlite3 = require('sqlite3').verbose();
// Directorio de la base de datos
const db = new sqlite3.Database("./databases/perm_users.sqlite");
module.exports.run = (client, message, args) => {
if(!args.join(" "))return message.channel.send(new MessageEmbed().setDescription(`
Uso correcto del comando 
.dataperm [ Argumentos: User ID ]
.dataperm [ Argumentos: User Mención ]
.dataperm [ Argumentos: 0 = Nulo ] 
`));
  let usera = message.mentions.users.first() || client.users.cache.get(args[0]);
                                  
  try {
  if(message.author.id !== "ID DEL PROPIETARIO DEL BOT")return message.channel.send("Bloqueado");

// En este caso solo necesitamos crear la tabla dentro de la base de datos...
// Como se ve en la parte de abajo creara una tabla que solo requiera de la id del user a registar...
// Y llamar esa tabla "perm_users"
db.run('CREATE TABLE IF NOT EXISTS perm_users (id TEXT)');
 message.channel.send(new MessageEmbed().setDescription("Tabla creada correctamente."));

  
  }catch (error){
  message.channel.send(`${error}`)
  }
}
module.exports.help = {
	name: "crea_tabla",
	aliases: [""],
	description: "",
	usage: "",
	category: "",
};
