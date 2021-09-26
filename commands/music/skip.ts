import { TextBasedChannels } from "discord.js";

const command: Command = {
  name: 'skip',
  aliases: ['sk'],
  utilisation: '{prefix}skip',
  voiceChannel: true,

  execute(client, message) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ${client.config.emoji.red}`);

    const success = queue.skip();

    return message.channel.send(
      success ? `Current music ${queue.current.title} skipped ✅` : `Something went wrong ${message.author}... try again ? ${client.config.emoji.red}`
    );
  },
};

export default command;
