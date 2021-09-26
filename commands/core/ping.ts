const ms = require('ms');

const command: Command = {
  name: 'ping',
  aliases: [],
  utilisation: '{prefix}ping',

  execute(client, message) {
    message.channel.send(
      // @ts-expect-error
      `Last heartbeat calculated ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago **${client.ws.ping}ms** 🛰️`
    );
  },
};

export default command;
