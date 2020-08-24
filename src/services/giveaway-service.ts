import { injectable } from 'inversify';
import { Message, Client, TextChannel } from 'discord.js';
import { prefix } from '../../config';

@injectable()
export class GiveawayService {
  entrees: Array<any> = [];
  gatheringEntrees: boolean = false;

  reset() {
    this.entrees = [];
    this.gatheringEntrees = false;
  }

  handle(message: Message, client: Client): Promise<boolean> {
    const prefixed = message.content.startsWith(prefix);
    const mentioned = client.user?.id && message.mentions.users.has(client.user?.id);
    if ((!prefixed && !mentioned) || message.author.bot) return;

    const args = prefixed ? message.content.slice(prefix.length).trim().split(/ +/) : message.content.split(/ +/).slice(1);
    const command = args.shift()?.toLowerCase() ?? '';
    const isOwner: boolean = (message.channel as TextChannel).guild?.ownerID === message.author.id;
    console.log(`command:${command} ${isOwner}`);

    if (command === 'enter') {
      if (this.gatheringEntrees) {
        if (this.entrees.some(e => e.Id === message.author.id)) {
          message.author.send('You have already entered this giveaway.');
        } else {
          this.entrees.push({
            Id: message.author.id,
            Name: message.author.username,
          });
          message.author.send('You are entered into the giveaway. Giveaway Dodo wishes you good luck!');
        }
      } else {
        message.author.send('Sorry, there is no giveaway running right now.');
      }
    } else if ((command === 'start' || command === 'start giveaway') && isOwner) {
      if (this.gatheringEntrees) {
        message.author.send('A giveaway is already running. ${prefix}stop to cancel it');
      } else {
        this.reset();
        this.gatheringEntrees = true;
        message.channel.send(`Giveaway Dodo says giveaway started! ${prefix}enter to enter`);
      }
    } else if ((command === 'stop' || command === 'cancel') && isOwner) {
      if (!this.gatheringEntrees) {
        message.author.send('there is no giveaway running');
      } else {
        this.reset();
        this.gatheringEntrees = false;
        message.channel.send(`Giveaway Dodo says giveaway is over.`);
      }
    } else if (command === 'list' && isOwner) {
      if (this.gatheringEntrees) {
        message.author.send(this.entrees.length ? this.entrees.map(o => `${o.Name}`).join('\n') : 'Nobody has entered yet!');
      } else {
        message.author.send(`Giveaway isn't started yet. ${prefix}start to start it.`);
      }
    } else if (command === 'choose' && isOwner) {
      if (this.gatheringEntrees) {
        if (!this.entrees.length) {
          message.author.send('Nobody has entered yet!');
        } else {
          const randomEntree = this.entrees[Math.floor(Math.random() * this.entrees.length)];
          message.channel.send(`Giveaway Dodo says ${randomEntree.Name} wins!!!`);
        }
      } else {
        message.author.send(`Giveaway isn't started yet. ${prefix}start to start it.`);
      }
    } else if (command === 'help') {
      message.author.send(
        `Command:\n\t${prefix}help >> show this help\n\t${prefix}enter >> enter the giveaway${
          !isOwner
            ? ''
            : `\n\t${prefix}start >> start accepting entrees for a new giveaway\n\t${prefix}stop >> cancel the current giveaway\n\t${prefix}list >> show list of current entrees\n\t${prefix}choose >> announce a random entree as the winner`
        }`
      );
    }
    return Promise.resolve(true);
  }
}
