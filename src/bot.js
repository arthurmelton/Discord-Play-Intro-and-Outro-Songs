
require("dotenv").config();
const ytdl = require('ytdl-core');

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "!S";

client.on('ready', () => {
	console.log(`${client.user.tag} bot is on`);
	client.user.setActivity(`${PREFIX}help`, { type: 'WATCHING' })
  		.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  		.catch(console.error);
})

client.on('message', (message) => {
	if (message.author.bot === true) return;
	if (!message.content.startsWith(PREFIX)) return;
	console.log(`[${message.author.tag}]: ${message.content}`);
	const [commandName, ...args] = message.content
		.trim()
		.substring(PREFIX.length)
		.split(/\s+/);
	if (commandName === "join") {
		const { voice } = message.member;
		if (!voice.channelID) {
			message.reply("You have to be in a voice channel");
			return;
		}

		const streamOptions = { seek: 0, volume: 1 };
		voice.channel.join().then(connection => {
			console.log(connection);
            const stream = ytdl(`${args[0]}`, { filter : 'audioonly' });
            const dispatcher = connection.play(stream, streamOptions);
            dispatcher.on("end", end => {
                console.log("left channel");
                voiceChannel.leave();
            });
        }).catch(err => console.log(err));
	}
	if (commandName === "play") {
		const { voice } = message.member;
		if (!voice.channelID) {
			message.reply("You have to be in a voice channel");
			return;
		}
		const streamOptions = { seek: 0, volume: 1 };
		const connection = message.member.voice.channel.join();
        const stream = ytdl(`${args[0]}`, { filter : 'audioonly' });
        const dispatcher = connection.play(stream, streamOptions);
        dispatcher.on("end", end => {
            console.log("left channel");
            voiceChannel.leave();
        });
	}

})
client.login(process.env.DISCORD_BOT_TOKEN);