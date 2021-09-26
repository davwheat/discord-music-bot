import { Player } from 'discord-player';
import { Client, Collection, Message } from 'discord.js';
import Config from './config';

declare global {
  const client: CustomClient;
  const player: Player;

  interface Command {
    name: string;
    aliases: string[];
    utilisation: string;
    voiceChannel?: boolean;
    showHelp?: boolean;

    execute(client: CustomClient, message: Message, args: string[]): void;
  }

  interface CustomClient extends Client {
    config: typeof Config;
    player: Player;
    commands: Collection<string, Command>;
  }
}
