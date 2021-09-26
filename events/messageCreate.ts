import { Message } from 'discord.js';

const messageCreate = (client: CustomClient, message: Message) => {
  if (message.author.bot || message.channel.type === 'DM') return;

  const prefix = client.config.app.px;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));

  const DJ = client.config.opt.DJ;

  if (cmd && DJ.enabled && (DJ.commands as unknown as string[]).includes(cmd.name)) {
    const roleDJ = message.guild.roles.cache.find((x) => x.name === DJ.roleName);

    if (!message.member.roles.cache.has(roleDJ.id)) {
      return message.channel.send(
        `This command is reserved for members with the ${DJ.roleName} role on the server ${message.author}... try again ? ${client.config.emoji.red}`
      );
    }
  }

  if (cmd && cmd.voiceChannel) {
    if (!message.member.voice.channel) return message.reply(`You need to be in a voice channel to use this command.`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
      return message.channel.send(`You are not in the same voice channel ${message.author}... try again ? ${client.config.emoji.red}`);
  }

  if (cmd) cmd.execute(client, message, args);
};

export default messageCreate;
