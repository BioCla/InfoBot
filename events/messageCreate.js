const { MessageEmbed } = require("discord.js");

// node_modules\discord.js\typings\index.d.ts:3940
// @messageCreate: [message: Message];
module.exports = async (client, message) => {
	const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
	// Checks if, on every message sent in a server in which the bot is in, the bot is being mentioned and
	// determines if it should behave in a manner or another according to if the user is a bot dev or not
	if (message.content.match(mention)) {
		message.delete();
		let timeout;
		let embed = new MessageEmbed().setColor(client.config.embedColor);
		if (client.config.ownerID.includes(message.author.id)) {
			timeout = 10000;
			embed
			.setTitle("Reinvite")
			.setURL(`https://discord.com/oauth2/authorize?client_id=${client.config.clientId}&permissions=${client.config.permissions}&scope=${client.config.scopes.toString().replace(',', '%20')}`)
		} else {
			timeout = 15000;
			embed
			.setDescription(`To use my commands use the \`/\` (Slash Command).\nTo see a list of the available commands type \`/help\`.\nIf you can't see the list, make sure you're using me in the appropriate channels. If you have trouble please contact a server Mod.`)
			.setThumbnail(`${client.config.iconURL}`)
		}
		embed.setFooter({ text: `Message will be deleted in ${timeout / 1000} seconds`});
		return message.channel.send({ embeds: [embed], }).then(msg => setTimeout(() => msg.delete(), timeout));
	}
};