import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { MessageResponder } from './services/message-responder';
import { CommandoClient } from 'discord.js-commando';
import path = require('path');

@injectable()
export class Bot {
  private client: CommandoClient;
  private readonly token: string;
  private messageResponder: MessageResponder;

  constructor(
    @inject(TYPES.Client) client: CommandoClient,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.MessageResponder) messageResponder: MessageResponder
  ) {
    this.client = client;
    this.token = token;
    this.messageResponder = messageResponder;
  }

  public listen(): Promise<string> {
    this.client.registry
      .registerDefaultTypes()
      .registerGroups([
        ['user', 'User commands'],
        ['owner', 'Owner commands'],
      ])
      .registerDefaultGroups()
      .registerDefaultCommands()
      .registerCommandsIn(path.join(__dirname, 'commands'));

    // this.client.on('message', (message: Message) => {
    //   if (message.author.bot) {
    //     console.log('Ignoring bot message!');
    //     return;
    //   }

    //   console.log('Message received! Contents: ', message.content);

    //   this.messageResponder
    //     .handle(message)
    //     .then(() => {
    //       console.log('Response sent!');
    //     })
    //     .catch(() => {
    //       console.log('Response not sent.');
    //     });
    // });

    this.client.once('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}! (${this.client.user.id})`);
      this.client.user.setActivity('with Commando');
    });

    return this.client.login(this.token);
  }
}
