const { MessageEmbed } = require('discord.js');

module.exports = {
	name: "ping",
	category: "utility",
	description: "Is the bot running slow? Check the bot's ping and see if it's lagging or if you are!",
	ownerOnly: false,
	run: async (client, interaction) => {
		const msg = await interaction.channel.send(`🏓 Pinging...`);
		const pingEmbed = new MessageEmbed()
		.setTitle(':signal_strength: PONG!')
		.addField("BOT", `\`\`\`yml\n${Math.floor(msg.createdAt - interaction.createdAt)}ms\`\`\``, true)
		.addField("API", `\`\`\`yml\n${client.ws.ping}ms\`\`\``, true)
		.setColor(client.config.embedColor)
		.setTimestamp();
		await interaction.reply({ embeds: [pingEmbed] });
		msg.delete();
	},
};