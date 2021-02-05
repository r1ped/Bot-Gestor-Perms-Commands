const { Client, Collection, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { sep } = require("path");
const { success, error, warning } = require("log-symbols"); 
const client = new Client();
const config = require('./config.json');
client.config = config;





client.on("ready", () => {

 //client.channels.cache.find(channel => channel.name == 'Generación 10').join();
  let status = ["www.nationsquad.us ",
                "Nation Squad Public",
                `YT | #NationSquad`
               ]
  let changes = ["PLAYING","WATCHING","LISTENING","STREAMING"]
  setInterval(function() {
client.user.setActivity(`${status[Math.floor(Math.random ()* status.length)]}`,
{
   
    type:`STREAMING`,
    URL:"https://www.twitch.tv/monstercat"
  }
  
)
  },2000);
});



client.on("message", message => {
  if(message.author.bot)return;
  if(message.author.id === "550170970409664543")return;
  if(message.author.id === "589483293758455810")return;	
  if(message.author.id === client.config.owner)return;
  if(message.guild.id !== "782986569668624424")return;
    const palabras_klias = 
["raid", "dox", "radiar",
"ra id", "ra1d", "r4id","r41d",
"Raid","Dox","RAID","DOX",
":v", ": v",":u", ": u", 
":V",": V","v:","v :","V :","V:",
";v", "; v", "; V","V ;", "v ;",
",v",", v", ",V",", V","ra1","rái",
"rài","räi","råi","rąi","rāi","ráíd",
"r4","dóx","d0x","d∅x","grabify.link",".nl","yóutube",
"discord.gg",">:", ":<","ip","IP","i p","I p"
];
  
    if( palabras_klias.some(word => message.content.includes(word)) ) {
     
      message.delete({timeout:10});
      
    }
});

["commands", "aliases"].forEach(x => client[x] = new Collection());
const load = (dir = "./commands/") => {

	readdirSync(dir).forEach(dirs => {
	
		const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith(".js"));
		for (const file of commands) {
			const pull = require(`${dir}/${dirs}/${file}`);
			if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category) === "string") {
				if (client.commands.get(pull.help.name)) return console.warn(`${warning} existen dos comando con el nombre: ${pull.help.name}.`);
				client.commands.set(pull.help.name, pull);
				console.log(`${success} Comando cargado: ${pull.help.name}.`);

			}
			else {
			
				console.log(`${error} error ejecutando el comando en ${dir}${dirs}. `);
		
				continue;
			}

			if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
				pull.help.aliases.forEach(alias => {
					
					if (client.aliases.get(alias)) return console.warn(`${warning} existen dos comandos con el mismo alias: ${alias}`);
					client.aliases.set(alias, pull.help.name);
				});
			}
		}

	});
};


load();

client.on("ready", () => {
  console.log("Iniciado.")
  console.log(`Logueado correctamente en ${client.user.tag} ID: ${client.user.id}`);
  console.log(`Servidores: ${client.guilds.cache.size}`);
  console.log(`Users: ${client.users.cache.size}`);
})


const tiempo = new Set();
client.on("message", async (message, msg )=> {
  if (message.author.bot || !message.guild) return;
	const prefix = ".";
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
 
	let command;

	
	if (!message.content.startsWith(prefix)) return;

	if (cmd.length === 0) return;
	if (client.commands.has(cmd)) command = client.commands.get(cmd);
	else if (client.aliases.has(cmd)) command = client.commands.get(client.aliases.get(cmd));

  if (tiempo.has(message.author.id)) {
  message.delete({timeout: 3500})
  message.channel.send(new MessageEmbed()
                       .setDescription("**Cooldown activado** - Debes esperar 4 segundos para ejecutar un comando <@" + message.author.id+">")).then(message => 
  message.delete({timeout: 4000}));
} else {
  
	if (command) command.run(client, message, args);
     tiempo.add(message.author.id);
  setTimeout(() => {
    tiempo.delete(message.author.id);
  }, 3000);
}
});


client.login("TOKEN-BOT");
