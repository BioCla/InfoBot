const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
.setName("previous")
.setDescription("Go back to the previous song.")
.setRun(async (client, interaction, options) => {
	let player;
	if (client.manager) player = client.manager.players.get(interaction.guild.id); 
else 
return interaction.reply({ embeds: [new MessageEmbed().setColor("RED").setDescription("Lavalink node is not connected")] });
	if (!player) {
		const queueEmbed = new MessageEmbed()
		.setColor(client.config.embedColor)
		.setDescription("❌ | **There's nothing playing in the queue**");
		return interaction.reply({ embeds: [queueEmbed], ephemeral: true });
	}
	
	if (!interaction.member.voice.channel) {
		const joinEmbed = new MessageEmbed()
		.setColor(client.config.embedColor)
		.setDescription("❌ | **You must be in a voice channel to use this command.**");
		return interaction.reply({ embeds: [joinEmbed], ephemeral: true });
	}
	
	if (interaction.guild.me.voice.channel && !interaction.guild.me.voice.channel.equals(interaction.member.voice.channel)) {
		const sameEmbed = new MessageEmbed()
		.setColor(client.config.embedColor)
		.setDescription("❌ | **You must be in the same voice channel as me to use this command!**");
		return interaction.reply({ embeds: [sameEmbed], ephemeral: true });
	}
	
	if (!player.queue.previous)
	return interaction.reply({
		embeds: [
			new MessageEmbed()
			.setColor(client.config.embedColor)
			.setDescription("❌ | **There is no previous song in the queue.**"),
		],
	});
	
	const currentSong = player.queue.current;
	player.play(player.queue.previous);
	interaction.reply({
		embeds: [
			new MessageEmbed()
			.setColor(client.config.embedColor)
			.setDescription(`⏮ | Previous song: **${currentSong.title}** by **${currentSong.requester.username}**`),
		],
	});
	
	if (currentSong) player.queue.unshift(currentSong);
});

module.exports = command;
