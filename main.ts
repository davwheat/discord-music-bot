// @ts-nocheck

import { Player } from 'discord-player';
import { Client, Intents } from 'discord.js';
import * as dotenv from 'dotenv';
import Config from './config';

dotenv.config();

global.client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
});

global.client.config = Config;

global.player = new Player(global.client, client.config.opt.discordPlayer);

require('./src/loader');
require('./src/events');

global.client.login(process.env.BOT_TOKEN);
