const command: Command = {
  name: 'resume',
  aliases: ['rs'],
  utilisation: '{prefix}resume',
  voiceChannel: true,

  execute(client, message) {
    const queue = player.getQueue<TextBasedChannels>(message.guild.id);

    if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ${client.config.emoji.red}`);

    const success = queue.setPaused(false);

    return message.channel.send(
      success ? `Current music ${queue.current.title} resumed ✅` : `Something went wrong ${message.author}... try again ? ${client.config.emoji.red}`
    );
  },
};

export default command;
