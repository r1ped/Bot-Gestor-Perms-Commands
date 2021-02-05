//Este remueve la id que se haya registrado por el valor "id" dentro de la tabla 

const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./databases/perm_users.sqlite");
module.exports.run = (client, message, args) => {
  if(!args.join(" "))return message.channel.send(new MessageEmbed().setDescription(`
Uso correcto del comando
.datarev [ Argumentos: User ID ]
.datarev [ Argumentos: User Mención ]
.datarev [ Argumentos: 0 = Nulo ]
`));
  var msg = message;
  let usera = msg.mentions.users.first() || client.users.cache.get(args[0]);
  if(!usera)return msg.channel.send( new MessageEmbed().setDescription("[ Argumentos : Mencion User | User ID ]"));                               
 try {
    
  if(message.author.id !== "ID DEL OWNER")return message.channel.send("Bloqueado");

    db.get('SELECT * FROM permisos WHERE id = '+usera.id, (err, table) => {
    if(err)return console.error(err);
    if(!table)return msg.channel.send(new MessageEmbed().setDescription("Este usuario no está registrado."));
    db.run('DELETE FROM permisos WHERE id = '+table.id, (err) => {
      if(err)return console.error(err);
    });
    msg.channel.send(new MessageEmbed() .setDescription("Usuario removido con exito."));
    });
  }catch (error){
  message.channel.send(`${error}`)
  }
}
module.exports.help = {
	name: "remover_id",
	aliases: [""],
	description: "",
	usage: "[ Uso independiente ]",
	category: "Nation Users",
};
