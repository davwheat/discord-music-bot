import { TextBasedChannels } from "discord.js";

const maxVol = client.config.opt.maxVol;
const volumeMultiplier = client.config.opt.maxVol / 100;

const command: Command = {
  name: 'volume',
  aliases: ['vol'],
  utilisation: `{prefix}volume [0-100]`,
  voiceChannel: true,

  execute(client, message, args) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);
    const vol = parseInt(args[0]);

    if (!queue) {
      return message.reply('${client.config.emoji.red} Nothing is playing at the moment');
    }

    if (!vol) {
      return message.reply(`🔊 Current volume: **${queue.volume}%**`);
    }

    if (isNaN(vol) || vol < 0 || vol > 100) {
      return message.reply(`Please provide a volume between 0 and 100.`);
    }

    const success = queue.setVolume(vol * volumeMultiplier);

    return message.reply(success ? `🔊 Volume set to ${vol}%` : `Error: couldn't set volume.`);
  },
};

export default command;
