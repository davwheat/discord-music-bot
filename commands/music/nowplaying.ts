import { TextBasedChannels } from 'discord.js';

const { MessageEmbed } = require('discord.js');

const command: Command = {
  name: 'nowplaying',
  aliases: ['np'],
  utilisation: '{prefix}nowplaying',
  voiceChannel: true,

  execute(client, message) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);

    if (!queue || !queue.playing)
      return message.reply(`No music currently playing ${message.author}... try again ? ${client.config.emoji.red}`);

    const track = queue.current;

    const embed = new MessageEmbed();

    embed.setColor('RED');
    embed.setThumbnail(track.thumbnail);
    embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

    const methods = ['disabled', 'track', 'queue'];

    const timestamp = queue.getPlayerTimestamp();
    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

    embed.setDescription(
      `Volume **${queue.volume}**%\nDuration **${trackDuration}**\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${track.requestedBy}`
    );

    embed.setTimestamp();
    embed.setFooter('Music comes first - Made with heart by Zerio ❤️', message.author.avatarURL({ dynamic: true }));

    message.channel.send({ embeds: [embed] });
  },
};

export default command;
