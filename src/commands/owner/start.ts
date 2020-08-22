import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { prefix } from '../../../config';

module.exports = class StartCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'start',
      aliases: ['begin'],
      group: 'owner',
      memberName: 'start',
      description: 'Clear the list of entrees and start accepting new entrees.',
    });
  }

  run(message: CommandoMessage) {
    return message.say(`Giveaway Dodo says giveaway started! ${prefix}enter to enter`);
  }
};
