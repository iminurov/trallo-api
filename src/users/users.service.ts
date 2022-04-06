import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findOne(id: any, options?: FindOneOptions<Users>) {
    return await this.usersRepository.findOne(id, options);
  }

  async update(user: Users, entity: DeepPartial<Users>) {
    await this.usersRepository.update({ id: user.id }, entity);

    return await this.usersRepository.findOne({ id: user.id });
  }

  async remove(id: string) {
    await this.usersRepository.delete({ id });

    return { id };
  }
}
