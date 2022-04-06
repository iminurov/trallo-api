import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { Cards } from './cards.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Cards)
    private readonly cardsRepository: Repository<Cards>,
  ) {}

  async create(entity: DeepPartial<Cards>, user: Users) {
    return await this.cardsRepository.save({
      ...entity,
      userId: user.id,
    });
  }

  async findAll(user: Users, columnId: string) {
    const filter = columnId && { columnId };
    return await this.cardsRepository.find({
      where: { userId: user.id, ...filter },
    });
  }

  async findOne(id: any, options?: FindOneOptions<Cards>) {
    return await this.cardsRepository.findOne(id, options);
  }

  async update(id: string, entity: DeepPartial<Cards>) {
    await this.cardsRepository.update(id, entity);

    return await this.cardsRepository.findOne(id);
  }

  async remove(id: string) {
    await this.cardsRepository.delete({ id });

    return { id };
  }
}
