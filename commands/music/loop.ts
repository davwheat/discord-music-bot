import { TextBasedChannels } from 'discord.js';

import { QueueRepeatMode } from 'discord-player';

const loopOrder = [QueueRepeatMode.OFF, QueueRepeatMode.QUEUE, QueueRepeatMode.TRACK];

const command: Command = {
  name: 'loop',
  aliases: ['repeat'],
  utilisation: '{prefix}loop',
  voiceChannel: true,

  execute(client, message) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);

    if (!queue || !queue.playing) return message.reply(`${client.config.emoji.red} Nothing is playing`);

    const currentRepeatMode = queue.repeatMode;
    const newRepeatMode = loopOrder[(loopOrder.indexOf(currentRepeatMode) + 1) % loopOrder.length];

    queue.setRepeatMode(newRepeatMode);

    switch (newRepeatMode) {
      case QueueRepeatMode.OFF:
        return message.reply(`▶️ **Looping disabled** (run again to switch loop type)`);

      case QueueRepeatMode.QUEUE:
        return message.reply(`🔁 **Looping entire queue** (run again to switch loop type)`);

      case QueueRepeatMode.TRACK:
        return message.reply(`🔂 **Looping current track** (run again to switch loop type)`);
    }
  },
};

export default command;
