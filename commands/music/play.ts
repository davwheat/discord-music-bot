import { QueryType } from 'discord-player';

const command: Command = {
  name: 'play',
  aliases: ['p'],
  utilisation: '{prefix}play [song name/URL]',
  voiceChannel: true,

  async execute(client, message, args) {
    if (!args[0]) return message.reply(`${client.config.emoji.red} Please provide a URL or search query`);

    const res = await player.search(args.join(' '), {
      requestedBy: message.member,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length) return message.reply(`${client.config.emoji.red} No results found for search query`);

    const queue = player.createQueue(message.guild, {
      metadata: message.channel,
      initialVolume: client.config.opt.maxVol,
    });

    try {
      if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
      player.deleteQueue(message.guild.id);
      return message.reply(`${client.config.emoji.red} Failed to join voice channel`);
    }

    await message.reply(`<a:loading:729422181402017922> Loading track`);

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};

export default command;
