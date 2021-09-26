import { TextBasedChannels } from "discord.js";

const command: Command = {
  name: 'back',
  aliases: ['previous'],
  utilisation: '{prefix}back',
  voiceChannel: true,

  async execute(client, message) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ${client.config.emoji.red}`);

    if (!queue.previousTracks[1]) return message.channel.send(`There was no music played before ${message.author}... try again ? ${client.config.emoji.red}`);

    await queue.back();

    message.channel.send(`Playing the **previous** track ✅`);
  },
};

export default command;
