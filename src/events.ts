import { PlayerError, Queue, Track } from 'discord-player';
import { MessageEmbed, TextBasedChannels } from 'discord.js';

player.on('error', ((queue: Queue<TextBasedChannels>, error: PlayerError) => {
  console.log(`Error emitted from the queue ${error.message}`);
}) as any);

player.on('connectionError', ((queue: Queue<TextBasedChannels>, error: PlayerError) => {
  console.log(`Error emitted from the connection ${error.message}`);
}) as any);

player.on('trackStart', ((queue: Queue<TextBasedChannels>, track: Track) => {
  const embed = new MessageEmbed({
    title: '🎧 Now playing...',
    description: track.title,
    color: 'LUMINOUS_VIVID_PINK',
  });

  embed.setThumbnail(track.thumbnail);

  queue.metadata.send({ embeds: [embed] });
}) as any);

player.on('trackAdd', ((queue: Queue<TextBasedChannels>, track: Track) => {
  queue.metadata.send(`${client.config.emoji.green} Added to queue: \`${track.title.replace(/`/g, '\\`')}\``);
}) as any);

player.on('botDisconnect', ((queue: Queue<TextBasedChannels>) => {
  queue.metadata.send(`${client.config.emoji.orange} Disconnected from voice by user. Clearing queue.`);
}) as any);

player.on('channelEmpty', ((queue: Queue<TextBasedChannels>) => {
  queue.metadata.send(`${client.config.emoji.orange} Noone left in voice. Leaving...`);
}) as any);

player.on('queueEnd', ((queue: Queue<TextBasedChannels>) => {
  queue.metadata.send(`${client.config.emoji.orange} Queue completed`);
}) as any);
