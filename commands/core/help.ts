const { MessageEmbed } = require('discord.js');

const command: Command = {
  name: 'help',
  aliases: ['h'],
  showHelp: false,
  utilisation: '{prefix}help',

  execute(client, message, args) {
    const embed = new MessageEmbed();

    embed.setColor('RED');
    embed.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

    const commands = client.commands.filter((x) => x.showHelp !== false);

    embed.setDescription('Open source music bot by MrJeeves');
    embed.addField(
      `Enabled - ${commands.size}`,
      commands.map((x) => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map((y) => y).join(', ')})\`` : '`'}`).join(' | ')
    );

    embed.setTimestamp();
    embed.setFooter('Music comes first', message.author.avatarURL({ dynamic: true }));

    message.reply({ embeds: [embed] });
  },
};

export default command;
