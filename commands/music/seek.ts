import { TextBasedChannels } from 'discord.js';

const ms = require('ms');

const command: Command = {
  name: 'seek',
  aliases: [],
  utilisation: '{prefix}seek [time]',
  voiceChannel: true,

  async execute(client, message, args) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);

    if (!queue || !queue.playing)
      return message.channel.send(`No music currently playing ${message.author}... try again ? ${client.config.emoji.red}`);

    const timeToMS = ms(args.join(' '));

    if (timeToMS >= queue.current.durationMS)
      return message.channel.send(
        `The indicated time is higher than the total time of the current song ${message.author}... try again ? ${client.config.emoji.red}\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`
      );

    await queue.seek(timeToMS);

    message.channel.send(`${client.config.emoji.green} Time set on the current song **${ms(timeToMS, { long: true })}** ✅`);
  },
};

export default command;
