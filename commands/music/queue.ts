import { MessageEmbed, TextBasedChannels } from 'discord.js';

const MaxQueueVisibleSize = 15;

const command: Command = {
  name: 'queue',
  aliases: ['q'],
  utilisation: '{prefix}queue',
  voiceChannel: true,

  execute(client, message) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);

    if (!queue) return message.reply(`${client.config.emoji.red} Nothing is playing`);

    // if (!queue.tracks[0])
    //   return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ${client.config.emoji.red}`);

    const embed = new MessageEmbed();

    embed.setColor('LUMINOUS_VIVID_PINK');
    embed.setTitle(`Queue`);

    const songs = queue.tracks.length + 1;

    embed.addField('Now playing', `${queue.current.title} (<@${queue.current.requestedBy.id}>)`);

    embed.addField(
      'Queue',
      queue.tracks
        .slice(1, MaxQueueVisibleSize + 1)
        .map((track, i) => `**${i + 1}.** ${track.title} (<@${track.requestedBy.id}>)`)
        .join('\n') + (songs > MaxQueueVisibleSize + 1 ? `*...and ${songs - MaxQueueVisibleSize - 1} more*` : '') || 'No songs in queue'
    );

    embed.addField('Total songs', songs.toString(), true);

    embed.setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};

export default command;
