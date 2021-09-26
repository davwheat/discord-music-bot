import { readdirSync } from 'fs';
import { Collection } from 'discord.js';

client.commands = new Collection();

const events = readdirSync('./events/').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

console.log(`Loading events...`);

for (const file of events) {
  const filename = file.split('.').slice(0, -1).join('.');

  const event = require(`../events/${filename}`).default;

  console.log(`-> Loaded event ${filename}`);

  client.on(file.split('.')[0], event.bind(null, client));
  delete require.cache[require.resolve(`../events/${filename}`)];
}

console.log(`Loading commands...`);

readdirSync('./commands/').forEach((dirs) => {
  const commands = readdirSync(`./commands/${dirs}`).filter((file) => (file.endsWith('.js') || file.endsWith('.ts')) && !file.includes('noCommand'));

  for (const file of commands) {
    const filename = file.split('.').slice(0, -1).join('.');

    const command = require(`../commands/${dirs}/${filename}`).default;

    console.log(`-> Loaded command ${command.name.toLowerCase()}`);

    client.commands.set(command.name.toLowerCase(), command);
    delete require.cache[require.resolve(`../commands/${dirs}/${filename}`)];
  }
});
