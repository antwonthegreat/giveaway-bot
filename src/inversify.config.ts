import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { Bot } from './bot';
import { CommandoClient } from 'discord.js-commando';
import { PingFinder } from './services/ping-finder';
import { MessageResponder } from './services/message-responder';

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<CommandoClient>(TYPES.Client).toConstantValue(
  new CommandoClient({
    commandPrefix: '?',
  })
);
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();
export default container;
