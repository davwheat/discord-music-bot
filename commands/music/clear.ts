import { TextBasedChannels } from "discord.js";

const command: Command = {
  name: 'clear',
  aliases: ['cq'],
  utilisation: '{prefix}clear',
  voiceChannel: true,

  async execute(client, message) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ${client.config.emoji.red}`);

    if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ${client.config.emoji.red}`);

    await queue.clear();

    message.channel.send(`The queue has just been cleared 🗑️`);
  },
};

export default command;
