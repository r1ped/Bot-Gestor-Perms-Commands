const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const sqlite3 = require('sqlite3').verbose();
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
  if(message.author.id !== "ID DEL OWNER")return message.channel.send("Bloqueado");
  // En este caso vemos que la query INSERT inserta un único valor "id" que seria la id del user y luego la declara desde la variable "usera" obteniendo de la misma la id del user mencionado
db.run('INSERT INTO permisos (id) values (?)',
            [usera.id]);
 message.channel.send(new MessageEmbed().setDescription("<@"+usera.id+"> registrado."));

  
  }catch (error){
  message.channel.send(`${error}`)
  }
}
module.exports.help = {
	name: "dtp",
	aliases: ["dataperm"],
	description: "",
	usage: "",
	category: "",
};
