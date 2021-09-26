import { TextBasedChannels } from "discord.js";

const command: Command = {
  name: 'stop',
  aliases: ['dc'],
  utilisation: '{prefix}stop',
  voiceChannel: true,

  execute(client, message) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);

    if (!queue || !queue.playing)
      return message.channel.send(`No music currently playing ${message.author}... try again ? ${client.config.emoji.red}`);

    queue.destroy();

    message.channel.send(`Music stopped into this server, see you next time ✅`);
  },
};

export default command;
