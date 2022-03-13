'use strict';

const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const webhook = require('./webhook/webhook');
const client = new Discord.Client({
    //fetchAllMembers: false,
    //restTimeOffset: 0,
    //restWsBridgetimeout: 100,
    shards: "auto",
    allowedMentions: {
      parse: [ ],
      repliedUser: false,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ 
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        //Discord.Intents.FLAGS.GUILD_BANS,
        //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        //Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        //Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        //Discord.Intents.FLAGS.DIRECT_MESSAGES,
        //Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    presence: {
      activity: {
        name: `Music`, 
        type: "LISTENING", 
      },
      status: "online"
    }
});

                 

client.commands = new Discord.Collection();

const db_create = require('./database/createDB');
db_create.create();
const sqlite3 = require("sqlite3");
const database_filepath = "./database/users.db";
const db = new sqlite3.Database(database_filepath);


function ImportCommands() {
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
	}
	const webhookFiles = fs.readdirSync('./embeds/Webhooks').filter(file => file.endsWith('.js'));
	for (const file of webhookFiles) {
		const command = require(`./embeds/Webhooks/${file}`);
		client.commands.set(command.name, command);
	}
}

function VerifyConfig() {
	if (!config) throw Error('Config file not found');
	if (!config.token) throw Error('Bot token not found');
	if (!config.sellix_auth) throw Error('Sellix token not found');
	if (!config.prefix) config.prefix = '!';
}


                  

client.once('ready', () => {
	VerifyConfig();
	ImportCommands();
	client.user.setActivity("Bix shop", { type: "STREAMING", url: "https://www.twitch.tv/bixxerr" })
	console.log(`Logged in as ${client.user.tag}`);
});

webhook.event.on('event',function(event_name, event_data){
	const command = client.commands.get(event_name);
	if(!command)return;
	var embed = command.execute(event_data);
	const channel = client.channels.cache.get(command.channel);
	if(embed)channel.send(embed);
})

client.on('message', async message => {
	const prefix = config.prefix;
	if (!message.content.startsWith(prefix))return;
	if (message.author === client.user || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName);
	if (!webhook) return;
	if (!command) return;

	if (message.channel.type === "dm") {
		return message.reply('Command not available in DMs');
	}

	if (command.adminOnly) {
		const adminArray = config.admins;
		if (!adminArray.includes(message.author.id))
			return message.reply('You don\'t have the permission to execute this command.');
	}

	try {
		await command.execute(message, args,db);
	}
	catch (error) {
		console.error(error);
		message.reply(`error trying to execute that command ${message.author}`);
	}

});

client.login(config.token);
