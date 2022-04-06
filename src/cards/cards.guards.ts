import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CardsService } from './cards.service';

@Injectable()
export class CardsOwnerGuard implements CanActivate {
  constructor(private readonly cardsService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cardId = request.body.cardId || request.params.id;
    const currentUserId = request.user.id;
    const card = await this.cardsService.findOne(
      { id: cardId },
      { select: ['userId'] },
    );

    if (!card) {
      throw new NotFoundException();
    }
    return currentUserId === card.userId;
  }
}

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(private readonly cardsService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cardId = request.query.cardId;
    const currentUserId = request.user.id;
    const card = await this.cardsService.findOne(
      { id: cardId },
      { select: ['userId'] },
    );

    if (!card) {
      return true;
    }
    return currentUserId === card.userId;
  }
}
