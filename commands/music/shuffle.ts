import { TextBasedChannels } from 'discord.js';

const command: Command = {
  name: 'shuffle',
  aliases: ['sh'],
  utilisation: '{prefix}shuffle',
  voiceChannel: true,

  async execute(client, message) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);

    if (!queue || !queue.playing)
      return message.channel.send(`No music currently playing ${message.author}... try again ? ${client.config.emoji.red}`);

    if (!queue.tracks[0])
      return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ${client.config.emoji.red}`);

    queue.shuffle();

    return message.channel.send(`Queue shuffled **${queue.tracks.length}** song(s) ! ✅`);
  },
};

export default command;
