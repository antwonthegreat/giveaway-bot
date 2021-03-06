import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { Bot } from './bot';
import { Client } from 'discord.js';
import { GiveawayService } from './services/giveaway-service';
import { MessageResponder } from './services/message-responder';

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<GiveawayService>(TYPES.GiveawayService).to(GiveawayService).inSingletonScope();
export default container;
