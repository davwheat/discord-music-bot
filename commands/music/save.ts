import { MessageEmbed, TextBasedChannels } from 'discord.js';

const command: Command = {
  name: 'save',
  aliases: ['sv'],
  utilisation: '{prefix}save',
  voiceChannel: true,

  async execute(client, message) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);

    if (!queue || !queue.playing) return message.reply(`${client.config.emoji.red} Nothing is playing`);

    try {
      const trackEmbed = new MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setTitle(`💾 Saved track`)
        .addField('Title', `${queue.current.title}`)
        .addField('Duration', `${queue.current.duration}`, true)
        .addField('Requested by', `<@${queue.current.requestedBy.id}>`, true)
        .addField('Played from', `<#${queue.metadata.id}>`, true)
        .setURL(queue.current.url)
        .setThumbnail(queue.current.thumbnail)
        .setTimestamp();

      await message.author.send({ embeds: [trackEmbed] });
      await message.react('✅');
    } catch {
      message.reply(`${client.config.emoji.red} Failed to send private message`);
    }
  },
};

export default command;
