import { Message, Client } from 'discord.js';
import { GiveawayService } from './giveaway-service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';

@injectable()
export class MessageResponder {
  private giveawayService: GiveawayService;

  constructor(@inject(TYPES.GiveawayService) giveawayService: GiveawayService) {
    this.giveawayService = giveawayService;
  }

  handle(message: Message, client: Client): Promise<boolean> {
    return this.giveawayService.handle(message, client);
  }
}
