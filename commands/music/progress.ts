const command: Command = {
  name: 'progress',
  aliases: ['pbar'],
  utilisation: '{prefix}progress',
  voiceChannel: true,

  async execute(client, message) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ${client.config.emoji.red}`);

    const progress = queue.createProgressBar();
    const timestamp = queue.getPlayerTimestamp();

    if (timestamp.progress == 'Infinity') return message.channel.send(`Playing a livestream. Remaining time is unknown.`);

    message.channel.send(`${progress} (**${timestamp.progress}**%)`);
  },
};

export default command;
